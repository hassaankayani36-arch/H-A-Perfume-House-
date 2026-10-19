import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { getIdTokenResult, onIdTokenChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from '../lib/firebase.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(isFirebaseConfigured);
  const authEventId = useRef(0);

  async function refreshProfile() {
    const currentUser = auth?.currentUser;
    if (!currentUser || !db) {
      setProfile(null);
      return;
    }
    const profileSnapshot = await getDoc(doc(db, 'customers', currentUser.uid));
    setProfile(profileSnapshot.exists() ? profileSnapshot.data() : null);
  }

  const refreshAdminClaim = useCallback(async (forceRefresh = true) => {
    const currentUser = auth?.currentUser;
    if (!currentUser) {
      setIsAdmin(false);
      return false;
    }
    const token = await getIdTokenResult(currentUser, forceRefresh);
    const hasAdminClaim = token.claims.admin === true;
    setUser(currentUser);
    setIsAdmin(hasAdminClaim);
    return hasAdminClaim;
  }, []);

  useEffect(() => {
    if (!auth || !db) return undefined;
    return onIdTokenChanged(auth, async (nextUser) => {
      const currentEventId = ++authEventId.current;
      setUser(nextUser);
      setProfile(null);
      setIsAdmin(false);
      if (!nextUser) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const token = await getIdTokenResult(nextUser);
        if (currentEventId !== authEventId.current) return;
        setIsAdmin(token.claims.admin === true);
      } catch (error) {
        if (currentEventId !== authEventId.current) return;
        console.error('Unable to load Firebase authentication claims.', error);
        setIsAdmin(false);
      } finally {
        if (currentEventId === authEventId.current) setLoading(false);
      }

      getDoc(doc(db, 'customers', nextUser.uid))
        .then((profileSnapshot) => {
          if (currentEventId === authEventId.current) {
            setProfile(profileSnapshot.exists() ? profileSnapshot.data() : null);
          }
        })
        .catch((error) => {
          if (currentEventId !== authEventId.current) return;
          console.error('Unable to load the signed-in customer profile.', error);
          setProfile(null);
        });
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, isAdmin, loading, configured: isFirebaseConfigured, refreshProfile, refreshAdminClaim }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
