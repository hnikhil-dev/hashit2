import React, { useEffect, useMemo, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import './App.css';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

const initialForm = {
  username: '',
  email: '',
  password: '',
};

function App() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState(initialForm);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const isConfigured = useMemo(() => Boolean(supabase), []);

  useEffect(() => {
    if (!supabase) {
      return undefined;
    }

    let isMounted = true;

    const loadSession = async () => {
      const {
        data: { session: currentSession },
      } = await supabase.auth.getSession();

      if (isMounted) {
        setSession(currentSession);
      }
    };

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      if (isMounted) {
        setSession(currentSession);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const resetFeedback = () => {
    setError('');
    setMessage('');
  };

  const isValidGmail = (email) => /^[^\s@]+@gmail\.com$/i.test(email.trim());

  const handleSubmit = async (event) => {
    event.preventDefault();
    resetFeedback();

    if (!supabase) {
      setError('Supabase is not configured. Add your env keys first.');
      return;
    }

    const email = form.email.trim().toLowerCase();
    const password = form.password.trim();
    const username = form.username.trim();

    if (!isValidGmail(email)) {
      setError('Please enter a valid Gmail address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (mode === 'register' && username.length < 3) {
      setError('Username must be at least 3 characters long.');
      return;
    }

    setLoading(true);

    try {
      if (mode === 'register') {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username,
            },
          },
        });

        if (signUpError) {
          throw signUpError;
        }

        setMessage(
          'Registration successful. Check your Gmail inbox for a confirmation link if email confirmation is enabled.'
        );
        setForm(initialForm);
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          throw signInError;
        }

        setMessage('Login successful.');
      }
    } catch (authError) {
      setError(authError.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    resetFeedback();

    if (!supabase) {
      return;
    }

    setLoading(true);

    try {
      const { error: signOutError } = await supabase.auth.signOut();

      if (signOutError) {
        throw signOutError;
      }

      setMessage('You have been signed out.');
    } catch (signOutError) {
      setError(signOutError.message || 'Unable to sign out right now.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    resetFeedback();

    if (!supabase) {
      setError('Supabase is not configured. Add your env keys first.');
      return;
    }

    setLoading(true);

    try {
      const { error: googleError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });

      if (googleError) {
        throw googleError;
      }
    } catch (googleError) {
      setError(
        googleError.message ||
          'Google sign-in could not start. Check your Supabase Google provider settings.'
      );
      setLoading(false);
    }
  };

  const currentUser = session?.user;
  const username =
    currentUser?.user_metadata?.username ||
    currentUser?.user_metadata?.full_name ||
    currentUser?.email?.split('@')[0] ||
    'User';

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <p className="eyebrow">Supabase Auth</p>
        <h1>Login and registration for your React app</h1>
        <p className="hero-copy">
          A simple auth flow connected directly to Supabase with Gmail address,
          username, and password fields.
        </p>
        <div className="feature-list">
          <span>Direct Supabase connection</span>
          <span>Email/password auth</span>
          <span>Session-aware screen</span>
        </div>
      </section>

      <section className="auth-panel">
        {!isConfigured ? (
          <div className="auth-card">
            <h2>Supabase keys missing</h2>
            <p className="panel-copy">
              Add `REACT_APP_SUPABASE_URL` and `REACT_APP_SUPABASE_ANON_KEY` to
              your `.env` file, then restart the frontend.
            </p>
          </div>
        ) : currentUser ? (
          <div className="auth-card">
            <p className="status-badge">Authenticated</p>
            <h2>Welcome, {username}</h2>
            <p className="panel-copy">
              You are signed in as <strong>{currentUser.email}</strong>.
            </p>
            {error ? <p className="feedback error">{error}</p> : null}
            {message ? <p className="feedback success">{message}</p> : null}
            <button
              type="button"
              className="secondary-button"
              onClick={handleSignOut}
              disabled={loading}
            >
              {loading ? 'Signing out...' : 'Sign out'}
            </button>
          </div>
        ) : (
          <div className="auth-card">
            <div className="tab-row">
              <button
                type="button"
                className={mode === 'login' ? 'tab active' : 'tab'}
                onClick={() => {
                  setMode('login');
                  resetFeedback();
                }}
              >
                Login
              </button>
              <button
                type="button"
                className={mode === 'register' ? 'tab active' : 'tab'}
                onClick={() => {
                  setMode('register');
                  resetFeedback();
                }}
              >
                Register
              </button>
            </div>

            <h2>{mode === 'login' ? 'Welcome back' : 'Create your account'}</h2>
            <p className="panel-copy">
              {mode === 'login'
                ? 'Sign in with your Gmail address and password.'
                : 'Create an account with a username, Gmail address, password, or use Google.'}
            </p>

            <button
              type="button"
              className="google-button"
              onClick={handleGoogleAuth}
              disabled={loading}
            >
              {loading ? 'Opening Google...' : 'Continue with Google'}
            </button>

            <div className="divider">
              <span>or continue with email</span>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              {mode === 'register' ? (
                <label className="input-group">
                  <span>Username</span>
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    value={form.username}
                    onChange={handleChange}
                    autoComplete="username"
                  />
                </label>
              ) : null}

              <label className="input-group">
                <span>Gmail address</span>
                <input
                  type="email"
                  name="email"
                  placeholder="you@gmail.com"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </label>

              <label className="input-group">
                <span>Password</span>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete={
                    mode === 'login' ? 'current-password' : 'new-password'
                  }
                />
              </label>

              {error ? <p className="feedback error">{error}</p> : null}
              {message ? <p className="feedback success">{message}</p> : null}

              <button type="submit" className="primary-button" disabled={loading}>
                {loading
                  ? mode === 'login'
                    ? 'Signing in...'
                    : 'Creating account...'
                  : mode === 'login'
                    ? 'Login'
                    : 'Register'}
              </button>
            </form>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
