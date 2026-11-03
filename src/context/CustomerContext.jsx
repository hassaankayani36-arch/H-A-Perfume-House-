import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getApps, initializeApp } from "@firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "@firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
const isConfigured = Object.values(firebaseConfig).every(Boolean);
const firebaseApp = isConfigured
  ? getApps().find((app) => app.name === "ha-storefront") || initializeApp(firebaseConfig, "ha-storefront")
  : null;
const auth = firebaseApp ? getAuth(firebaseApp) : null;
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

const CustomerContext = createContext(null);

export function CustomerProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(auth));

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return undefined;
    }
    return onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setLoading(false);
    }, (error) => {
      console.error("Customer authentication state could not be loaded:", error.code || error.name);
      setUser(null);
      setLoading(false);
    });
  }, []);

  const value = useMemo(() => ({
    user,
    loading,
    isConfigured,
    signInWithGoogle: async () => {
      if (!auth) throw new Error("Google sign-in is not configured. Add the Firebase web app settings and rebuild.");
      return signInWithPopup(auth, provider);
    },
    signOutCustomer: async () => {
      if (auth) await signOut(auth);
    },
  }), [user, loading]);

  return <CustomerContext.Provider value={value}>{children}</CustomerContext.Provider>;
}

export function useCustomer() {
  const value = useContext(CustomerContext);
  if (!value) throw new Error("useCustomer must be used within CustomerProvider.");
  return value;
}
