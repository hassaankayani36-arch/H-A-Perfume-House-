import type { SyntheticEvent } from 'react';

export const handleProductImageError = (event: SyntheticEvent<HTMLImageElement>) => {
  const image = event.currentTarget;
  if (image.dataset.loadFailed) return;

  image.dataset.loadFailed = 'true';
  console.error(`Image failed to load: ${image.currentSrc || image.src}`);
  image.removeAttribute('src');
  image.hidden = true;
};
