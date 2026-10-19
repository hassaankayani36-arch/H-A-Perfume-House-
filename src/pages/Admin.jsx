import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth } from '../lib/firebase.js';
import { useAuth } from '../context/AuthContext.jsx';
import './admin.css';

export default function Admin() {
  const navigate = useNavigate();
  const { user, isAdmin, loading, configured, refreshAdminClaim } = useAuth();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notFound, setNotFound] = useState(false);
  const [claimCheck, setClaimCheck] = useState(null);

  if (loading) {
    return <main className="adminPage"><p role="status">Checking Firebase sign-in…</p></main>;
  }

  if (user && isAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (notFound || (user && !isAdmin)) {
    return (
      <main className="adminPage">
        <section className="adminLogin">
          <p className="adminEyebrow">404 · Page not found</p>
          <h1>This page isn’t available</h1>
          <p>The signed-in Google account does not have access to this page.</p>
          <div className="space-y-2 border border-[#ddd] p-3 text-left text-xs">
            <p><strong>Signed-in email:</strong> {user?.email || 'Not available'}</p>
            <p className="break-all"><strong>Firebase UID:</strong> {user?.uid || 'Not available'}</p>
            <p><strong>Admin claim:</strong> {claimCheck === null ? (isAdmin ? 'true' : 'false') : claimCheck ? 'true' : 'false'}</p>
          </div>
          {error && <p className="adminError" role="alert">{error}</p>}
          <button type="button" disabled={busy} onClick={refreshAdminAccess}>
            {busy ? 'Checking access…' : 'Refresh admin access'}
          </button>
          <button type="button" onClick={handleSignOut}>Sign out</button>
          <Link to="/" className="text-center text-sm underline">Return to shop</Link>
        </section>
      </main>
    );
  }

  async function handleSubmit() {
    setBusy(true);
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      await signInWithPopup(auth, provider);
      if (await refreshAdminClaim(true)) {
        setClaimCheck(true);
        navigate('/admin/dashboard', { replace: true });
      } else {
        setClaimCheck(false);
        setNotFound(true);
      }
    } catch (signInError) {
      console.error('Administrator sign-in failed.', signInError);
      if (signInError.code === 'auth/popup-closed-by-user') {
        setError('The Google sign-in window closed before login finished. Allow pop-ups for this site, then click Continue with Google and complete sign-in in the new window.');
      } else if (signInError.code === 'auth/popup-blocked') {
        setError('Your browser blocked the Google sign-in pop-up. Allow pop-ups for this site, then try again.');
      } else {
        setError(signInError.message || 'Unable to sign in. Please try again.');
      }
      setBusy(false);
    }
  }

  async function refreshAdminAccess() {
    setBusy(true);
    setError('');
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        setNotFound(false);
        return;
      }
      if (await refreshAdminClaim(true)) {
        setClaimCheck(true);
        setNotFound(false);
        navigate('/admin/dashboard', { replace: true });
      } else {
        setClaimCheck(false);
        setError('Admin permission is not on this account yet. Confirm the Firebase Auth UID, then sign out and sign back in.');
      }
    } catch (refreshError) {
      console.error('Unable to refresh administrator access.', refreshError);
      setError(refreshError.message || 'Unable to refresh administrator access.');
    } finally {
      setBusy(false);
    }
  }

  async function handleSignOut() {
    try {
      await signOut(auth);
      setNotFound(false);
    } catch (signOutError) {
      console.error('Unable to sign out of the administrator page.', signOutError);
      setError(signOutError.message || 'Unable to sign out. Please try again.');
    }
  }

  function handleSubmitEvent(event) {
    event.preventDefault();
  }

  return (
    <main className="adminPage">
      <form className="adminLogin" onSubmit={handleSubmitEvent}>
        <p className="adminEyebrow">H&A Perfume House</p>
        <h1>Admin sign in</h1>
        <p>Administrator access requires a Google account with a trusted Firebase admin claim. A Google sign-in window will open.</p>
        {!configured && <p className="adminError" role="alert">Configure Firebase in .env before signing in.</p>}
        {error && <p className="adminError" role="alert">{error}</p>}
        <button type="button" disabled={!configured || busy} onClick={handleSubmit}>
          {busy ? 'Checking access…' : 'Continue with Google'}
        </button>
      </form>
    </main>
  );
}
