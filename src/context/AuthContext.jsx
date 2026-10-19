import { createContext, useContext, useEffect, useState } from 'react';
import { getIdTokenResult, onIdTokenChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from '../lib/firebase.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(isFirebaseConfigured);

  async function refreshProfile() {
    const currentUser = auth?.currentUser;
    if (!currentUser || !db) {
      setProfile(null);
      return;
    }
    const profileSnapshot = await getDoc(doc(db, 'customers', currentUser.uid));
    setProfile(profileSnapshot.exists() ? profileSnapshot.data() : null);
  }

  useEffect(() => {
    if (!auth || !db) return undefined;
    return onIdTokenChanged(auth, async (nextUser) => {
      setUser(nextUser);
      setProfile(null);
      setIsAdmin(false);
      if (!nextUser) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const [token, profileSnapshot] = await Promise.all([
          getIdTokenResult(nextUser),
          getDoc(doc(db, 'customers', nextUser.uid)),
        ]);
        setIsAdmin(token.claims.admin === true);
        setProfile(profileSnapshot.exists() ? profileSnapshot.data() : null);
      } catch (error) {
        console.error('Unable to load the signed-in account.', error);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, isAdmin, loading, configured: isFirebaseConfigured, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
