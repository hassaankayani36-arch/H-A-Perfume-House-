import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import 'dotenv/config';
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const [uid, serviceAccountPath] = process.argv.slice(2);

if (!uid || !serviceAccountPath) {
  console.error('Usage: npm run admin:grant -- <FIREBASE_AUTH_UID> <SERVICE_ACCOUNT_JSON_PATH>');
  process.exit(1);
}

if (!process.env.VITE_FIREBASE_PROJECT_ID) {
  console.error('VITE_FIREBASE_PROJECT_ID is missing. Configure the Firebase project in .env first.');
  process.exit(1);
}

try {
  const serviceAccount = JSON.parse(await readFile(resolve(serviceAccountPath), 'utf8'));
  if (serviceAccount.project_id !== process.env.VITE_FIREBASE_PROJECT_ID) {
    throw new Error('The service account belongs to a different Firebase project.');
  }

  const app = getApps()[0] ?? initializeApp({
    credential: cert(serviceAccount),
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  });
  const adminAuth = getAuth(app);
  const user = await adminAuth.getUser(uid);
  await adminAuth.setCustomUserClaims(uid, {
    ...user.customClaims,
    admin: true,
  });

  console.log(`Admin claim granted to ${user.email ?? user.uid} in ${serviceAccount.project_id}.`);
  console.log('Sign out and sign back in to refresh the account token.');
} catch (error) {
  console.error(`Unable to grant admin access: ${error.message}`);
  process.exitCode = 1;
}
