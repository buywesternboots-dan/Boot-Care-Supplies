'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { getSupabaseBrowserClient } from '@/lib/supabase/browser';

type LoginModalProps = {
  onClose: () => void;
};

type OAuthProvider = 'google' | 'facebook';

export default function LoginModal({ onClose }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const supabase = getSupabaseBrowserClient();

  async function signInWithProvider(provider: OAuthProvider) {
    setError(null);

    if (!supabase) {
      setError('Supabase is not configured yet.');
      return;
    }

    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.origin }
    });

    if (authError) {
      setError(authError.message);
    }
  }

  async function signInWithEmail() {
    setError(null);
    setMessage(null);

    if (!supabase) {
      setError('Supabase is not configured yet.');
      return;
    }

    const { error: authError } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin }
    });

    if (authError) {
      setError(authError.message);
      return;
    }

    setMessage('Check your email for a sign-in link.');
  }

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="login-title" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <h2 id="login-title">Login</h2>
          <button className="icon-button" type="button" aria-label="Close login" onClick={onClose}>
            <X size={16} />
          </button>
        </div>
        <div className="provider-grid">
          <button className="ghost-action" type="button" onClick={() => signInWithProvider('google')}>
            Continue with Google
          </button>
          <button className="ghost-action" type="button" onClick={() => signInWithProvider('facebook')}>
            Continue with Facebook
          </button>
          <button className="ghost-action" type="button" onClick={() => setError('Reddit login needs a custom auth setup. Use email for now.')}>
            Continue with Reddit
          </button>
        </div>
        <label className="field-label">
          Email
          <input value={email} type="email" onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
        </label>
        <button className="primary-action" type="button" onClick={signInWithEmail}>
          Send sign-in link
        </button>
        {message ? <div className="form-message">{message}</div> : null}
        {error ? <div className="form-message error">{error}</div> : null}
      </div>
    </div>
  );
}
