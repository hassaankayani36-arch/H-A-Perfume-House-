# H&A Luxury

H&A Luxury is a React/Vite fragrance storefront with an Express API and MongoDB-backed product catalog and orders.

## Configure MongoDB and the admin

Use the annotated [root `.env.example`](./.env.example) as the complete variable reference. Copy it to `.env` and replace the `CHANGE_ME` values; `.env` is Git-ignored. Keep your real connection string and signing secrets in `.env`, not in this documentation.

`MONGODB_DB` is optional and defaults to `ha_perfume_house`.

Generate a signing secret in PowerShell with:

```powershell
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

Keep the connection string, admin password, session secret, and Firebase service account server-side; never expose or commit them. For local development, save the Firebase Admin SDK service-account JSON outside this repository (for example, `%USERPROFILE%\.secrets\firebase-service-account.json`) and set `FIREBASE_SERVICE_ACCOUNT_PATH` in `.env` to its full path. Do not copy the JSON into the project or rely on Git ignore rules to protect it. For deployments, provide the JSON through the server-only `FIREBASE_SERVICE_ACCOUNT_JSON` environment variable instead. The Firebase web-app values are intentionally `VITE_*` because they are public client configuration. Use a MongoDB user limited to the application's database.

### Set up Firebase Google sign-in locally

1. Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
2. In **Build → Authentication → Sign-in method**, enable **Google** and choose a support email.
3. In **Authentication → Settings → Authorized domains**, add `localhost` for local testing. Add your production storefront domain before deploying.
4. In **Project settings → General**, register a **Web app** and copy its `apiKey`, `authDomain`, `projectId`, and `appId` into the matching `VITE_FIREBASE_*` entries in the repository-root `.env`. Use the same `projectId` for `FIREBASE_PROJECT_ID`.
5. In **Project settings → Service accounts**, generate a Firebase Admin SDK private key. Save the downloaded JSON outside the repository, such as `%USERPROFILE%\.secrets\firebase-service-account.json`. Set `FIREBASE_SERVICE_ACCOUNT_PATH` in `.env` to its full path. Never commit or share this private key.
6. Restart both the API and storefront dev server so they load the new environment settings. Add a product to your bag, open checkout on the storefront, and use **Continue with Google**.

The `VITE_FIREBASE_*` values are Firebase web-app configuration, not service-account credentials. The service-account JSON is a private server credential; store it outside the repository or in server environment settings. Do not expose it through a `VITE_*` variable.

## Run locally

**Prerequisites:** Node.js 20+ and npm.

1. Install dependencies with `npm install`.
2. Seed the current 35-product catalog once with `npm run seed`. The seed only inserts missing products; it does not overwrite existing catalog edits.
3. Configure Firebase Google sign-in as described above.
4. In one terminal, start the API with `npm run dev:server`.
5. In another terminal, start the storefront with `npm run dev`, then open `http://localhost:3000`.
6. To start the separate order dashboard, run `npm run dev` in `dashboard-cherrycreamsoda/`. The root `npm install` installs its workspace dependencies too. Open the Vite URL it prints (normally `http://localhost:5173/admin`). See [dashboard-cherrycreamsoda/README.md](./dashboard-cherrycreamsoda/README.md) for dashboard setup.
7. The storefront admin at `/admin` manages products and orders. Admins can add products, edit their images using HTTPS URLs or existing local image files under `Data/imgs/`, and permanently delete orders after confirmation. The standalone dashboard focuses on order management.
8. Checkout requires Google sign-in. Customer names and emails come from the verified Firebase account; phone and delivery details are saved to the customer profile and an order snapshot.

The dev server proxies `/api` requests to the Express API on port 3001. `npm start` serves the production build and API together after `npm run build`.

## Deploy the monorepo to Vercel

The repository root contains the storefront, the orders dashboard, and the Express/MongoDB API. Import the Git repository into Vercel as **one project** and keep **Root Directory** set to the repository root. Root `vercel.json` defines two Vercel services: `app` (root Vite storefront plus its `/api/*` serverless functions) and `dashboard` (the standalone Vite orders dashboard). Public routes are `/` and `/api/*` to `app`, and `/dashboard/*` to `dashboard`; the storefront's product and order administration remains at `/admin`, and the standalone orders dashboard is at `/dashboard/admin`. The services share one domain and the admin session cookie.

Before the first deployment, add these environment variables in the Vercel project settings for each environment you deploy:

- `MONGODB_URI` — the production MongoDB connection string.
- `MONGODB_DB` — optional; defaults to `ha_perfume_house`.
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET` — generate a unique secret with the command above.
- `FIREBASE_PROJECT_ID`
- `FIREBASE_SERVICE_ACCOUNT_JSON` — the private Firebase service-account JSON.
- `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, and `VITE_FIREBASE_APP_ID` — public Firebase web-app config used at build time.
- `ADMIN_ALLOWED_ORIGINS` — leave empty for this single-origin deployment. It is only needed if you intentionally host the dashboard on a different origin.

Do not prefix server-only values with `VITE_`. Configure MongoDB Atlas network access for Vercel and use a database user restricted to this application database. Keep secrets in Vercel's Environment Variables settings; do not commit `.env` files or service-account keys. The dashboard calls the API through the same-origin `/api/*` public route, so it needs no `VITE_API_BASE_URL` and there are no service bindings in this architecture. Once the Git repository is connected and these settings are saved, Vercel automatically builds each service and deploys each push to the configured production branch. The API runs as serverless functions, not a long-running server.

If the production database has not been seeded, run `npm run seed` once with valid MongoDB credentials before expecting products to appear.

The Vercel filesystem is not persistent storage. Product images must use HTTPS URLs or be committed under `Data/imgs/` before deployment; files added to the running server cannot be saved there permanently.

## Data behavior

- Product descriptions and pricing/availability are stored in MongoDB. Each size has its own selling price, compare-at price, and in-stock flag. The initial import preserves the storefront's existing PKR 100 markdown and marks the sizes as in stock because the source file contains no stock counts.
- Orders are created server-side from current database prices; browser-supplied prices and totals are not trusted. New orders require a verified Google customer and include that Firebase UID as the stable customer ID. Phone and delivery details are saved to a customer profile and snapshotted on each order.
- New orders are Cash on Delivery only and start with the dashboard status `New`; admins can change them to `Pending`, `Completed`, or `Failed`. New records store PKR totals and a USD/PKR rate/date snapshot from open.er-api.com. Currency changes in either dashboard are presentation-only. Legacy records are left unchanged and display no USD value when no historical rate exists.
- The admin session is an HTTP-only, same-site signed cookie with an eight-hour expiry. The admin password is read from `.env`, never returned to the browser.
- The standalone orders dashboard in `dashboard-cherrycreamsoda/` uses the same server-side admin session and order API. It is deployed as the `dashboard` Vercel service at `/dashboard/admin`, so it shares the API origin and HTTP-only session cookie. For local development, it can still be started separately; its Vite proxy forwards `/api` to port 3001.
- The standalone dashboard consumes `GET /api/admin/session` for authentication, `POST` and `DELETE /api/admin/session` for sign-in/out, `GET /api/admin/orders` for the latest 200 orders, and `PATCH /api/admin/orders/:recordId/status` for status changes. These routes require the server-managed admin session; no admin credentials or service-account keys belong in the dashboard build.
- There is no payment gateway, email notification, or inventory quantity reservation; stock is managed as an in-stock/out-of-stock flag.
- Contact/newsletter confirmations and review submissions are not persisted by this integration; the review form still opens WhatsApp.

## Build

Run `npm run build` to create the production storefront bundle.
