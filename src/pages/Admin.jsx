import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, getIdTokenResult, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../lib/firebase.js';
import { useAuth } from '../context/AuthContext.jsx';
import './admin.css';

export default function Admin() {
  const navigate = useNavigate();
  const { user, isAdmin, loading, configured } = useAuth();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  if (loading) {
    return <main className="adminPage"><p>Checking administrator access…</p></main>;
  }

  if (user && isAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  async function handleSubmit() {
    setBusy(true);
    setError('');
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      const token = await getIdTokenResult(result.user, true);
      if (token.claims.admin !== true) {
        await signOut(auth);
        setError('This Google account is not authorized to access the admin dashboard.');
        return;
      }
      navigate('/admin/dashboard', { replace: true });
    } catch (signInError) {
      console.error('Administrator sign-in failed.', signInError);
      setError(signInError.message || 'Unable to sign in. Please try again.');
    } finally {
      setBusy(false);
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
        <p>Administrator access requires a Google account with a trusted Firebase admin claim.</p>
        {!configured && <p className="adminError" role="alert">Configure Firebase in .env before signing in.</p>}
        {error && <p className="adminError" role="alert">{error}</p>}
        <button type="button" disabled={!configured || busy} onClick={handleSubmit}>
          {busy ? 'Checking access…' : 'Continue with Google'}
        </button>
      </form>
    </main>
  );
}
