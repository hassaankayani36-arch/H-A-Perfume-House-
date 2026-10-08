import 'dotenv/config';
import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDirectory = path.join(root, 'public', 'images', 'perfumes');
const targetImageCount = 36;
const pageSize = 30;
const retryCount = 2;
const queries = [
  'luxury perfume bottle',
  'glass perfume bottle',
  'perfume bottle studio',
  'amber perfume bottle',
  'gold cap perfume bottle',
  'minimal perfume bottle white background',
  'oud perfume bottle',
  'perfume gift set',
];

const brandTerms = [
  'armani', 'azzaro', 'baccarat rouge', 'burberry', 'calvin klein', 'carolina herrera',
  'chanel', 'dior', 'dolce & gabbana', 'dolce and gabbana', 'givenchy', 'gucci',
  'hermes', 'hugo boss', 'issey miyake', 'jean paul gaultier', 'jo malone',
  'lancome', 'maison francis kurkdjian', 'mugler', 'paco rabanne', 'prada',
  'tom ford', 'versace', 'ysl', 'yves saint laurent',
];
const uncertainTerms = ['logo', 'brand name', 'branded', 'famous brand', 'recognisable label', 'readable label'];

function isAcceptableDescription(text) {
  const description = text.toLowerCase();
  return !brandTerms.some((term) => description.includes(term))
    && !uncertainTerms.some((term) => description.includes(term));
}

function getJpegDimensions(buffer) {
  if (buffer[0] !== 0xff || buffer[1] !== 0xd8) return null;

  let offset = 2;
  while (offset + 4 < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    const marker = buffer[offset + 1];
    offset += 2;
    if (marker === 0xd9 || marker === 0xda) break;
    if (offset + 2 > buffer.length) break;

    const segmentLength = buffer.readUInt16BE(offset);
    const isStartOfFrame = [
      0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7,
      0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf,
    ].includes(marker);

    if (isStartOfFrame && offset + 7 < buffer.length) {
      return {
        height: buffer.readUInt16BE(offset + 3),
        width: buffer.readUInt16BE(offset + 5),
      };
    }

    offset += segmentLength;
  }

  return null;
}

async function fetchJson(url, headers = {}) {
  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`Image provider returned HTTP ${response.status}.`);
  }
  return response.json();
}

async function getUnsplashPhotos(query, apiKey) {
  const url = new URL('https://api.unsplash.com/search/photos');
  url.searchParams.set('query', query);
  url.searchParams.set('per_page', String(pageSize));
  url.searchParams.set('orientation', 'portrait');

  const result = await fetchJson(url, { Authorization: `Client-ID ${apiKey}` });
  return result.results.map((photo) => ({
    id: `unsplash:${photo.id}`,
    width: photo.width,
    height: photo.height,
    description: [photo.alt_description, photo.description].filter(Boolean).join(' '),
    downloadUrl: `${photo.urls.raw}&fm=jpg&fit=max&w=2200&q=88`,
    photographer: photo.user.name,
    sourceUrl: photo.links.html,
    license: 'Unsplash License',
    licenseUrl: 'https://unsplash.com/license',
  }));
}

async function getPexelsPhotos(query, apiKey) {
  const url = new URL('https://api.pexels.com/v1/search');
  url.searchParams.set('query', query);
  url.searchParams.set('per_page', String(pageSize));
  url.searchParams.set('orientation', 'portrait');

  const result = await fetchJson(url, { Authorization: apiKey });
  return result.photos.map((photo) => ({
    id: `pexels:${photo.id}`,
    width: photo.width,
    height: photo.height,
    description: photo.alt ?? '',
    downloadUrl: photo.src.original,
    photographer: photo.photographer,
    sourceUrl: photo.url,
    license: 'Pexels License',
    licenseUrl: 'https://www.pexels.com/license/',
  }));
}

async function downloadPhoto(photo) {
  let lastError;

  for (let attempt = 0; attempt <= retryCount; attempt += 1) {
    try {
      const response = await fetch(photo.downloadUrl);
      if (!response.ok) throw new Error(`Photo download returned HTTP ${response.status}.`);

      const contentType = response.headers.get('content-type') ?? '';
      if (!contentType.toLowerCase().includes('image/jpeg')) {
        throw new Error('Photo provider did not return a JPEG image.');
      }

      const bytes = Buffer.from(await response.arrayBuffer());
      const dimensions = getJpegDimensions(bytes);
      if (!dimensions || dimensions.width < 1200 || dimensions.width > dimensions.height) {
        throw new Error('Downloaded image did not meet the JPEG resolution/orientation checks.');
      }

      return { bytes, dimensions };
    } catch (error) {
      lastError = error;
      if (attempt < retryCount) {
        await new Promise((resolve) => setTimeout(resolve, 500 * (attempt + 1)));
      }
    }
  }

  console.warn(`Skipping photo after ${retryCount} retries: ${lastError.message}`);
  return null;
}

async function main() {
  const unsplashKey = process.env.UNSPLASH_KEY;
  const pexelsKey = process.env.PEXELS_KEY;

  if (!unsplashKey || !pexelsKey) {
    throw new Error('Add UNSPLASH_KEY and PEXELS_KEY to your local .env file before fetching images.');
  }

  await mkdir(outputDirectory, { recursive: true });

  const candidates = [];
  for (const query of queries) {
    console.log(`Searching licensed stock photos: "${query}"`);
    const [unsplash, pexels] = await Promise.all([
      getUnsplashPhotos(query, unsplashKey),
      getPexelsPhotos(query, pexelsKey),
    ]);
    candidates.push(...unsplash, ...pexels);
  }

  const seenPhotoIds = new Set();
  const seenHashes = new Set();
  const credits = {};
  let savedCount = 0;

  for (const photo of candidates) {
    if (savedCount >= targetImageCount) break;
    if (seenPhotoIds.has(photo.id)) continue;
    seenPhotoIds.add(photo.id);

    if (!photo.description || !isAcceptableDescription(photo.description)) continue;
    if (photo.width < 1200 || photo.width > photo.height) continue;

    const download = await downloadPhoto(photo);
    if (!download) continue;

    const hash = createHash('sha256').update(download.bytes).digest('hex');
    if (seenHashes.has(hash)) continue;
    seenHashes.add(hash);

    savedCount += 1;
    const filename = `perfume-${String(savedCount).padStart(2, '0')}.jpg`;
    await writeFile(path.join(outputDirectory, filename), download.bytes, { flag: 'w' });
    credits[filename] = {
      photographer: photo.photographer,
      sourceUrl: photo.sourceUrl,
      license: photo.license,
      licenseUrl: photo.licenseUrl,
      resolution: `${download.dimensions.width}x${download.dimensions.height}`,
    };
    console.log(`${filename}: ${download.dimensions.width}x${download.dimensions.height} (${photo.id})`);
  }

  await writeFile(
    path.join(outputDirectory, 'credits.json'),
    `${JSON.stringify(credits, null, 2)}\n`,
    'utf8',
  );

  if (savedCount < 24) {
    throw new Error(`Only ${savedCount} suitable unique photos were found; at least 24 are required.`);
  }
  if (savedCount < targetImageCount) {
    throw new Error(
      `Only ${savedCount} unique photos passed filtering. The product gallery needs 36 photos; review credits.json and rerun after adjusting the source results.`,
    );
  }

  console.log(`Saved ${savedCount} unique high-resolution photos to public/images/perfumes/.`);
  console.log('Review every image manually before publishing to confirm no visible third-party brand marks.');
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
