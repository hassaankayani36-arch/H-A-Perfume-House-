# H&A Luxury

H&A Luxury is a React/Vite fragrance storefront with an Express API and MongoDB-backed product catalog and orders.

## Configure MongoDB and the admin

Keep the existing `MONGODB_URI` in your local `.env` file (it is ignored by Git), and add:

```env
ADMIN_EMAIL=your-admin-email
ADMIN_PASSWORD=use-a-unique-long-password
ADMIN_SESSION_SECRET=paste-a-random-secret-of-at-least-32-bytes
```

`MONGODB_DB` is optional and defaults to `ha_perfume_house`.

Generate a signing secret in PowerShell with:

```powershell
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

Keep the connection string, admin password, and session secret server-side. Never add them to `VITE_*` variables or commit `.env`. Use a MongoDB user limited to the application's database.

## Run locally

**Prerequisites:** Node.js 20+ and npm.

1. Install dependencies with `npm install`.
2. Seed the current 35-product catalog once with `npm run seed`. The seed only inserts missing products; it does not overwrite existing catalog edits.
3. In one terminal, start the API with `npm run dev:server`.
4. In another terminal, start Vite with `npm run dev`.
5. Open `/admin` to sign in and manage products and orders. Admins can add products, edit their images using HTTPS URLs or existing local image files under `Data/imgs/`, and permanently delete orders after confirmation.

The dev server proxies `/api` requests to the Express API on port 3001. `npm start` serves the production build and API together after `npm run build`.

## Deploy the monorepo to Vercel

The repository root contains both the Vite storefront and Express/MongoDB API. Import the Git repository into Vercel as one project and keep the **Root Directory** set to the repository root. The included `vercel.json` builds the storefront into `public/`, serves it as static files, and routes API requests to the Express app in the same deployment.

Add these server-side environment variables in the Vercel project settings for each environment you deploy:

- `MONGODB_URI` — the production MongoDB connection string.
- `MONGODB_DB` — optional; defaults to `ha_perfume_house`.
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET` — generate a unique secret with the command above.

Do not prefix these values with `VITE_`. Configure MongoDB Atlas network access for Vercel and use a database user restricted to this application database. Then deploy; Vercel will install the root dependencies and run `npm run build`.

The Vercel filesystem is not persistent storage. Product images must use HTTPS URLs or be committed under `Data/imgs/` before deployment; files added to the running server cannot be saved there permanently.

## Data behavior

- Product descriptions and pricing/availability are stored in MongoDB. Each size has its own selling price, compare-at price, and in-stock flag. The initial import preserves the storefront's existing PKR 100 markdown and marks the sizes as in stock because the source file contains no stock counts.
- Orders are created server-side from current database prices; browser-supplied prices and totals are not trusted. Promo codes and optional gift notes are persisted with each order.
- The admin session is an HTTP-only, same-site signed cookie with an eight-hour expiry. The admin password is read from `.env`, never returned to the browser.
- COD and bank/card selections are saved as order payment methods. There is no payment gateway, email notification, or inventory quantity reservation yet; non-COD payments require manual confirmation, and stock is managed as an in-stock/out-of-stock flag.
- Contact/newsletter confirmations and review submissions are not persisted by this integration; the review form still opens WhatsApp.

## Build

Run `npm run build` to create the production storefront bundle.
