# H&A Orders Dashboard

This is the standalone H&A order-management dashboard. It is a separate React/Vite frontend, but it is **not** a separate backend: it uses the storefront's Express API, MongoDB orders, and server-managed admin session. It does not connect directly to MongoDB or contain admin credentials.

The storefront's `/admin` page remains available for product administration and order management. The standalone dashboard focuses on orders and can be opened at `/admin` on its own local or deployed dashboard URL.

## What it does

- Signs in through the storefront API using the same server-configured admin email and password.
- Loads up to the latest 200 orders from the live database.
- Persists status updates (`New`, `Pending`, `Completed`, `Failed`) through the API.
- Displays order totals in PKR or USD. USD uses the exchange rate saved with each order; legacy orders without a saved rate show USD as unavailable.
- Provides order search, sorting, filters, and receipt details.

## Run locally

Prerequisites: Node.js 20+, npm, a configured root `.env`, MongoDB, and the Firebase Admin SDK credential used by the API.

1. In a terminal at the repository root, start the API:

   ```powershell
   npm run dev:server
   ```

2. In a second terminal, install dashboard dependencies once and start Vite:

   ```powershell
   cd dashboard-cherrycreamsoda
   npm install
   npm run dev
   ```

3. Open the URL Vite prints, normally `http://localhost:5173/admin`. Sign in with `ADMIN_EMAIL` and `ADMIN_PASSWORD` from the root `.env`.

The [dashboard `.env.example`](./.env.example) documents its only environment variable, `VITE_API_BASE_URL`. The dashboard's Vite proxy forwards `/api/` requests to `http://localhost:3001`; leave the variable empty for local development. If port 5173 is occupied, Vite will print a different port; use that URL.

## Deploy separately to Vercel

1. Create a new Vercel project from the same Git repository.
2. Set **Root Directory** to `dashboard-cherrycreamsoda`. Its Vercel configuration builds to `dist` and rewrites deep links such as `/admin` to the dashboard app.
3. Set the build-time environment variable `VITE_API_BASE_URL` to the public HTTPS origin of the storefront/API, without a trailing slash (for example, `https://shop.example.com`).
4. On the storefront/API Vercel project, set `ADMIN_ALLOWED_ORIGINS` to the dashboard's exact HTTPS origin (for example, `https://dashboard.example.com`). For multiple origins, separate them with commas and no trailing slashes.
5. Prefer sibling subdomains, such as `shop.example.com` and `dashboard.example.com`. They keep the dashboard and API same-site while still allowing separate deployments. Configure the admin session, Firebase, and database secrets **only** on the storefront/API project; never add them to dashboard environment variables.
6. Redeploy both projects after changing environment variables. Open `https://your-dashboard-domain/admin` and sign in with the server-configured admin credentials.

The dashboard uses credentialed API requests and the API's HTTP-only admin cookie. The API must allow the dashboard origin exactly; unrelated origins are rejected. Avoid hosting the dashboard and API on unrelated sites because browser third-party-cookie restrictions can prevent session cookies from working.

## API used

All routes below are served by the storefront/API and require the server-side admin session except where noted:

| Method | Route | Purpose |
|---|---|---|
| `GET` | `/api/admin/session` | Check the current admin session |
| `POST` | `/api/admin/session` | Sign in and set the HTTP-only session cookie |
| `DELETE` | `/api/admin/session` | Sign out |
| `GET` | `/api/admin/orders` | Load recent orders |
| `PATCH` | `/api/admin/orders/:recordId/status` | Persist an order status change |

## Build locally

From this directory:

```powershell
npm run build
```

The production dashboard bundle is written to `dist/`.
