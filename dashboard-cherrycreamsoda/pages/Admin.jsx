import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../api.js';
import './admin.css';

export default function Admin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    let active = true;
    apiRequest('/api/admin/session')
      .then(() => {
        if (active) navigate('/admin/dashboard', { replace: true });
      })
      .catch((requestError) => {
        if (active && requestError.message !== 'Admin sign-in is required.') setError(requestError.message);
      })
      .finally(() => {
        if (active) setCheckingSession(false);
      });
    return () => {
      active = false;
    };
  }, [navigate]);

  async function handleSubmit(event) {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      await apiRequest('/api/admin/session', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      navigate('/admin/dashboard', { replace: true });
    } catch (requestError) {
      setError(requestError.message || 'Sign-in failed.');
    } finally {
      setBusy(false);
    }
  }

  if (checkingSession) return <main className="adminPage"><p>Checking administrator access…</p></main>;

  return (
    <main className="adminPage">
      <form className="adminLogin" onSubmit={handleSubmit}>
        <h1>Admin sign in</h1>
        <label htmlFor="adminEmail">Email</label>
        <input
          id="adminEmail"
          name="email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <label htmlFor="adminPassword">Password</label>
        <input
          id="adminPassword"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        {error && <p className="adminError" role="alert">{error}</p>}
        <button type="submit" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
      </form>
    </main>
  );
}
