import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  GoogleAuthProvider,
  RecaptchaVerifier,
  linkWithPopup,
  signInWithPhoneNumber,
  signOut,
} from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { ArrowLeft, Check, LoaderCircle, ShieldCheck } from 'lucide-react';
import Logo from '../assets/logo/Logo.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { auth, db } from '../lib/firebase.js';

const inputClass = 'w-full border border-[#2E2E2E] bg-[#121212] px-4 py-3 text-sm text-[#F5F2EC] outline-none focus:border-[#C6A15B]';

function explainAuthError(error) {
  const knownMessages = {
    'auth/invalid-phone-number': 'Enter a valid phone number in international format, such as +923001234567.',
    'auth/too-many-requests': 'Too many attempts were made. Wait a while and try again.',
    'auth/invalid-verification-code': 'That SMS code is not correct. Check it and try again.',
    'auth/code-expired': 'That SMS code expired. Request a new one.',
    'auth/popup-closed-by-user': 'The Google sign-in window was closed before completing sign-in.',
    'auth/credential-already-in-use': 'That Google account is already linked to another customer account. Contact support to recover access.',
    'auth/provider-already-linked': 'A Google account is already linked to this phone number.',
    'auth/account-exists-with-different-credential': 'That Google account already uses another sign-in method. Contact support to link your accounts safely.',
  };
  return knownMessages[error.code] || error.message || 'The request could not be completed. Please try again.';
}

export default function Account() {
  const { user, profile, loading, configured, refreshProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [step, setStep] = useState('phone');
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [confirmation, setConfirmation] = useState(null);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    line1: '',
    line2: '',
    city: '',
    postalCode: '',
    country: 'Pakistan',
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const verifierRef = useRef(null);

  useEffect(() => () => verifierRef.current?.clear(), []);

  useEffect(() => {
    if (!user?.phoneNumber) {
      setStep('phone');
      return;
    }
    setPhone(user.phoneNumber);
    const googleLinked = user.providerData.some((provider) => provider.providerId === 'google.com');
    setStep(googleLinked ? 'profile' : 'google');
    if (user.displayName) {
      const [firstName = '', ...lastNames] = user.displayName.split(' ');
      setForm((current) => ({ ...current, firstName, lastName: lastNames.join(' ') }));
    }
  }, [user]);

  useEffect(() => {
    if (!profile) return;
    setForm({
      firstName: profile.firstName || '',
      lastName: profile.lastName || '',
      line1: profile.address?.line1 || '',
      line2: profile.address?.line2 || '',
      city: profile.address?.city || '',
      postalCode: profile.address?.postalCode || '',
      country: profile.address?.country || 'Pakistan',
    });
  }, [profile]);

  async function sendCode(event) {
    event.preventDefault();
    setError('');
    setNotice('');
    setBusy(true);
    try {
      verifierRef.current?.clear();
      verifierRef.current = new RecaptchaVerifier(auth, 'phone-recaptcha', { size: 'normal' });
      const result = await signInWithPhoneNumber(auth, phone.trim(), verifierRef.current);
      setConfirmation(result);
      setStep('verify');
      setNotice(`A verification code was sent to ${phone.trim()}.`);
    } catch (authError) {
      setError(explainAuthError(authError));
      verifierRef.current?.clear();
      verifierRef.current = null;
    } finally {
      setBusy(false);
    }
  }

  async function verifyCode(event) {
    event.preventDefault();
    setError('');
    setBusy(true);
    try {
      const result = await confirmation.confirm(verificationCode.trim());
      if (!result.user.phoneNumber) throw new Error('Firebase did not confirm a verified phone number.');
      setPhone(result.user.phoneNumber);
      setStep('google');
      setNotice('Phone number verified successfully.');
    } catch (authError) {
      setError(explainAuthError(authError));
    } finally {
      setBusy(false);
    }
  }

  async function linkGoogleAccount() {
    setError('');
    setBusy(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await linkWithPopup(auth.currentUser, provider);
      if (!result.user.email || !result.user.emailVerified) {
        throw new Error('The Google account must have a verified email address.');
      }
      setStep('profile');
      setNotice(`Google account linked: ${result.user.email}`);
    } catch (authError) {
      setError(explainAuthError(authError));
    } finally {
      setBusy(false);
    }
  }

  async function saveProfile(event) {
    event.preventDefault();
    setError('');
    setBusy(true);
    try {
      const currentUser = auth.currentUser;
      if (!currentUser?.phoneNumber || !currentUser.email || !currentUser.emailVerified) {
        throw new Error('Verify your phone number and link a verified Google account before saving your profile.');
      }
      const customerRef = doc(db, 'customers', currentUser.uid);
      const profileData = {
        uid: currentUser.uid,
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        displayName: `${form.firstName.trim()} ${form.lastName.trim()}`.trim(),
        email: currentUser.email,
        phone: currentUser.phoneNumber,
        address: {
          line1: form.line1.trim(),
          line2: form.line2.trim(),
          city: form.city.trim(),
          postalCode: form.postalCode.trim(),
          country: form.country.trim(),
        },
        onboardingComplete: true,
        ...(profile ? {} : { createdAt: serverTimestamp() }),
        updatedAt: serverTimestamp(),
      };
      await setDoc(customerRef, profileData, { merge: true });
      await refreshProfile();
      setNotice('Your verified customer profile has been saved.');
      if (location.state?.from === '/checkout') navigate('/checkout', { replace: true });
    } catch (saveError) {
      console.error('Unable to save customer profile.', saveError);
      setError(explainAuthError(saveError));
    } finally {
      setBusy(false);
    }
  }

  if (!configured) {
    return (
      <main className="min-h-[70vh] px-4 py-20 text-center">
        <div className="mx-auto max-w-xl space-y-5">
          <Logo size="md" variant="full" />
          <h1 className="font-serif text-3xl">Firebase setup needed</h1>
          <p className="text-sm leading-7 text-[#F5F2EC]/65">
            Add the Firebase web app configuration to your local <code>.env</code> file, then restart the development server.
          </p>
        </div>
      </main>
    );
  }

  if (loading) {
    return <div className="grid min-h-[70vh] place-items-center text-[#C6A15B]"><LoaderCircle className="animate-spin" /></div>;
  }

  if (profile?.onboardingComplete) {
    return (
      <main className="min-h-[70vh] px-4 py-20 text-center">
        <div className="mx-auto max-w-xl space-y-5">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-[#C6A15B] text-[#C6A15B]"><Check /></div>
          <h1 className="font-serif text-3xl">Your account is ready</h1>
          <p className="text-sm text-[#F5F2EC]/65">{profile.email} · verified phone {profile.phone}</p>
          <div className="flex justify-center gap-4">
            <button className="border border-[#2E2E2E] px-5 py-3 text-xs uppercase tracking-widest text-[#F5F2EC]/70" onClick={() => setStep('profile')}>Update details</button>
            <Link className="border border-[#C6A15B] px-5 py-3 text-xs uppercase tracking-widest text-[#C6A15B]" to="/shop">Continue shopping</Link>
            <button className="px-5 py-3 text-xs uppercase tracking-widest text-[#F5F2EC]/65" onClick={() => signOut(auth)}>Sign out</button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[80vh] bg-[#0B0B0B] px-4 py-14 text-[#F5F2EC] sm:py-20">
      <section className="mx-auto max-w-2xl border border-[#262626] bg-[#101010] p-6 sm:p-10">
        <Link to="/shop" className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#F5F2EC]/55 hover:text-[#C6A15B]"><ArrowLeft size={14} /> Back to shop</Link>
        <div className="mb-8">
          <p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-[#C6A15B]">Customer account · Step {step === 'phone' || step === 'verify' ? '1' : step === 'google' ? '2' : '3'} of 3</p>
          <h1 className="font-serif text-3xl sm:text-4xl">Create your account</h1>
          <p className="mt-3 text-sm leading-6 text-[#F5F2EC]/60">Verify your phone, link your Google email, then save the required delivery details.</p>
        </div>

        <ol className="mb-8 grid grid-cols-3 gap-2 text-center text-[9px] uppercase tracking-wider sm:text-[10px]">
          {['Verify phone', 'Google account', 'Delivery details'].map((label, index) => {
            const activeIndex = step === 'phone' || step === 'verify' ? 0 : step === 'google' ? 1 : 2;
            return <li key={label} className={`border-b-2 pb-3 ${index <= activeIndex ? 'border-[#C6A15B] text-[#C6A15B]' : 'border-[#262626] text-[#F5F2EC]/35'}`}>{label}</li>;
          })}
        </ol>

        {step === 'phone' && (
          <form className="space-y-5" onSubmit={sendCode}>
            <label className="block space-y-2 text-xs uppercase tracking-wider text-[#F5F2EC]/70">
              Phone number (international format)
              <input className={inputClass} autoComplete="tel" type="tel" placeholder="+923001234567" pattern="\+[1-9]\d{7,14}" value={phone} onChange={(event) => setPhone(event.target.value)} required />
            </label>
            <p className="text-xs leading-5 text-[#F5F2EC]/45">Firebase will send an SMS code. Enter the number with its country code, such as +92.</p>
            <div id="phone-recaptcha" />
            <button disabled={busy} className="w-full bg-[#C6A15B] px-5 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-[#0B0B0B] disabled:opacity-50">{busy ? 'Sending code…' : 'Send verification code'}</button>
          </form>
        )}

        {step === 'verify' && (
          <form className="space-y-5" onSubmit={verifyCode}>
            <label className="block space-y-2 text-xs uppercase tracking-wider text-[#F5F2EC]/70">
              SMS verification code sent to {phone}
              <input className={inputClass} autoComplete="one-time-code" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} value={verificationCode} onChange={(event) => setVerificationCode(event.target.value)} required />
            </label>
            <button disabled={busy} className="w-full bg-[#C6A15B] px-5 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-[#0B0B0B] disabled:opacity-50">{busy ? 'Verifying…' : 'Verify phone'}</button>
            <button type="button" className="w-full py-2 text-xs text-[#F5F2EC]/55 underline" onClick={() => { setStep('phone'); setConfirmation(null); setNotice(''); }}>Change phone number</button>
          </form>
        )}

        {step === 'google' && (
          <div className="space-y-5">
            <p className="flex items-center gap-2 text-sm text-[#C6A15B]"><ShieldCheck size={18} /> Phone verified: {phone}</p>
            <p className="text-sm leading-6 text-[#F5F2EC]/60">Next, link a Google account to this verified phone sign-in. The Google email must be verified.</p>
            <button disabled={busy} onClick={linkGoogleAccount} className="w-full border border-[#C6A15B] px-5 py-3.5 text-xs uppercase tracking-[0.2em] text-[#C6A15B] disabled:opacity-50">{busy ? 'Opening Google…' : 'Continue with Google'}</button>
          </div>
        )}

        {step === 'profile' && (
          <form className="space-y-5" onSubmit={saveProfile}>
            <p className="text-xs text-[#C6A15B]">Verified phone {user?.phoneNumber} · Google email {user?.email}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-xs uppercase tracking-wider text-[#F5F2EC]/70">First name<input className={inputClass} autoComplete="given-name" value={form.firstName} onChange={(event) => setForm({ ...form, firstName: event.target.value })} required /></label>
              <label className="space-y-2 text-xs uppercase tracking-wider text-[#F5F2EC]/70">Last name<input className={inputClass} autoComplete="family-name" value={form.lastName} onChange={(event) => setForm({ ...form, lastName: event.target.value })} required /></label>
            </div>
            <label className="block space-y-2 text-xs uppercase tracking-wider text-[#F5F2EC]/70">Street address / house number<input className={inputClass} autoComplete="address-line1" value={form.line1} onChange={(event) => setForm({ ...form, line1: event.target.value })} required /></label>
            <label className="block space-y-2 text-xs uppercase tracking-wider text-[#F5F2EC]/70">Apartment, suite, floor (optional)<input className={inputClass} autoComplete="address-line2" value={form.line2} onChange={(event) => setForm({ ...form, line2: event.target.value })} /></label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-xs uppercase tracking-wider text-[#F5F2EC]/70">City<input className={inputClass} autoComplete="address-level2" value={form.city} onChange={(event) => setForm({ ...form, city: event.target.value })} required /></label>
              <label className="space-y-2 text-xs uppercase tracking-wider text-[#F5F2EC]/70">Postal code<input className={inputClass} autoComplete="postal-code" value={form.postalCode} onChange={(event) => setForm({ ...form, postalCode: event.target.value })} required /></label>
            </div>
            <label className="block space-y-2 text-xs uppercase tracking-wider text-[#F5F2EC]/70">Country<input className={inputClass} autoComplete="country-name" value={form.country} onChange={(event) => setForm({ ...form, country: event.target.value })} required /></label>
            <button disabled={busy} className="w-full bg-[#C6A15B] px-5 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-[#0B0B0B] disabled:opacity-50">{busy ? 'Saving account…' : 'Save required details'}</button>
          </form>
        )}

        {notice && <p role="status" className="mt-5 text-sm text-[#C6A15B]">{notice}</p>}
        {error && <p role="alert" className="mt-5 border border-red-900/70 bg-red-950/30 p-3 text-sm text-red-300">{error}</p>}
      </section>
    </main>
  );
}
