import { readFileSync } from "node:fs";
import path from "node:path";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

function getFirebaseAuth() {
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
  if (!serviceAccountJson && !serviceAccountPath) {
    const error = new Error("Customer sign-in is not configured on the server.");
    error.status = 503;
    throw error;
  }

  const appName = "ha-customer-auth";
  let app = getApps().find((entry) => entry.name === appName);
  if (!app) {
    let serviceAccount;
    try {
      const contents = serviceAccountJson || readFileSync(path.resolve(serviceAccountPath), "utf8");
      serviceAccount = JSON.parse(contents);
    } catch {
      const error = new Error(serviceAccountJson
        ? "FIREBASE_SERVICE_ACCOUNT_JSON must contain valid JSON."
        : "FIREBASE_SERVICE_ACCOUNT_PATH must point to a readable JSON service account file.");
      error.status = 503;
      throw error;
    }

    try {
      app = initializeApp({
        credential: cert({
          ...serviceAccount,
          private_key: serviceAccount.private_key?.replace(/\\n/g, "\n"),
        }),
        projectId: process.env.FIREBASE_PROJECT_ID || serviceAccount.project_id,
      }, appName);
    } catch {
      const error = new Error("Firebase Admin credentials are invalid or do not match the configured project.");
      error.status = 503;
      throw error;
    }
  }
  return getAuth(app);
}

export async function verifyGoogleCustomerToken(token) {
  const auth = getFirebaseAuth();
  const decoded = await auth.verifyIdToken(token, true);
  if (decoded.firebase?.sign_in_provider !== "google.com" || decoded.email_verified !== true ||
      typeof decoded.uid !== "string" || typeof decoded.email !== "string" ||
      typeof decoded.name !== "string" || !decoded.name.trim()) {
    const error = new Error("Use a verified Google account with a name to continue.");
    error.status = 403;
    throw error;
  }
  return {
    uid: decoded.uid,
    email: decoded.email.trim().toLowerCase(),
    name: decoded.name.trim(),
  };
}

export function requireGoogleCustomer(request, response, next) {
  const authorization = request.get("authorization") || "";
  const match = /^Bearer ([^\s]+)$/i.exec(authorization);
  if (!match) return response.status(401).json({ error: "Google sign-in is required." });

  verifyGoogleCustomerToken(match[1])
    .then((customer) => {
      request.customerIdentity = customer;
      next();
    })
    .catch((error) => {
      if (error.status === 503) return response.status(503).json({ error: error.message });
      console.warn("Customer token verification failed:", error.code || error.name);
      response.status(error.status || 401).json({
        error: error.status === 403 ? error.message : "Your sign-in has expired. Sign in again.",
      });
    });
}
