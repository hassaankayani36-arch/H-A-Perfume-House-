# H&A Luxury

H&A Luxury is a React and JavaScript fragrance storefront powered by Vite.

## Run Locally

**Prerequisites:** Node.js and npm

1. Install dependencies with `npm install`.
2. Start the development server with `npm run dev`.
3. Create a production build with `npm run build`.

## Firebase setup

Customer accounts use Firebase Phone Authentication followed by a linked Google
account. Customers then complete their required name and delivery-address
fields, which are stored in `customers/{uid}` in Cloud Firestore. Keep the
Firebase web app configuration in a local `.env` file; do not commit that file.

1. In Firebase Console, enable **Phone** and **Google** under Authentication →
   Sign-in method, add your development/production domains to Authorized
   domains, and create a Cloud Firestore database.
2. Copy the six `VITE_FIREBASE_*` values from Project settings → General →
   Your apps into `.env` (the matching `YOUR_FIREBASE_*` entries in
   `.env.example` are placeholders). Restart Vite after changing `.env`.
3. Publish `firestore.rules` using the Firebase Console Rules editor or Firebase
   CLI: `firebase deploy --only firestore:rules --project YOUR_PROJECT_ID`.
4. Grant administrator access only by setting the Firebase Auth custom claim
   `admin: true` with a trusted Firebase Admin SDK process. Never set an admin
   role in client code or in a customer-editable Firestore document.

The admin dashboard reads Firestore `orders` and allows admins to update an
order's status. Firestore intentionally denies browser-side order creation.
Checkout remains disabled until a trusted server-side order function validates
prices against a trusted catalog; card/bank payments also need a real payment
provider integration. Do not enable the current checkout UI as order processing
until those pieces are implemented and tested.
