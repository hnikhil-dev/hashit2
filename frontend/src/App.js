import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import HomePage from './HomePage';
import { supabase } from './supabaseClient';

const initialForm = {
  username: '',
  email: '',
  password: '',
};

// Floating symbols component for creative background
const FloatingSymbols = () => {
  const symbols = ['₹', '$', '€', '¥', '£', '₿'];
  
  return (
    <div className="floating-symbols">
      {symbols.map((symbol, index) => (
        <span
          key={index}
          className="float-symbol"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${15 + Math.random() * 10}s`,
          }}
        >
          {symbol}
        </span>
      ))}
    </div>
  );
};

function App() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState(initialForm);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [roomForm, setRoomForm] = useState({
    createName: '',
    joinName: '',
  });

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

  const handleRoomChange = (event) => {
    const { name, value } = event.target;
    setRoomForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleCreateRoom = (event) => {
    event.preventDefault();
    resetFeedback();
    
    if (!roomForm.createName.trim()) {
      setError('Please enter a room name');
      return;
    }
    
    setMessage(`Game room "${roomForm.createName}" created! (Backend integration pending)`);
    setRoomForm({ ...roomForm, createName: '' });
  };

  const handleJoinRoom = (event) => {
    event.preventDefault();
    resetFeedback();
    
    if (!roomForm.joinName.trim()) {
      setError('Please enter a room code');
      return;
    }
    
    setMessage(`Joining room "${roomForm.joinName}"... (Backend integration pending)`);
    setRoomForm({ ...roomForm, joinName: '' });
  };

  const currentUser = session?.user;
  const username =
    currentUser?.user_metadata?.username ||
    currentUser?.user_metadata?.full_name ||
    currentUser?.email?.split('@')[0] ||
    'User';

  return (
    <>
      {!isConfigured ? (
        <main className="app-shell">
          <FloatingSymbols />
          <section className="hero-panel">
            <p className="eyebrow">Vectra Financial Game</p>
            <h1>Configuration Required</h1>
            <p className="hero-copy">
              Add REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY to
              your .env file, then restart the application.
            </p>
          </section>
        </main>
      ) : currentUser ? (
        <HomePage
          currentUser={currentUser}
          username={username}
          roomForm={roomForm}
          error={error}
          message={message}
          loading={loading}
          onRoomChange={handleRoomChange}
          onCreateRoom={handleCreateRoom}
          onJoinRoom={handleJoinRoom}
          onSignOut={handleSignOut}
        />
      ) : (
        <main className="app-shell">
          <FloatingSymbols />
          <section className="hero-panel">
            <p className="eyebrow">Vectra Financial Game</p>
            <h1>Master Your Financial Future</h1>
            <p className="hero-copy">
              Compete in multiplayer financial simulation. Make strategic investment decisions, 
              manage risk, and build wealth over multiple years. Test your financial skills 
              against real players in dynamic market scenarios.
            </p>
            <div className="feature-list">
              <span>Investment Strategy</span>
              <span>Risk Management</span>
              <span>Multiplayer Rooms</span>
              <span>Real-Time Competition</span>
            </div>
          </section>

          <section className="auth-panel">
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

              <h2>{mode === 'login' ? 'Player Login' : 'Join Vectra'}</h2>
              <p className="panel-copy">
                {mode === 'login'
                  ? 'Sign in to access your player profile and join game rooms.'
                  : 'Create a player account to compete in financial simulation matches.'}
              </p>

              <button
                type="button"
                className="google-button"
                onClick={handleGoogleAuth}
                disabled={loading}
              >
                {loading ? 'Connecting...' : 'Quick Start with Google'}
              </button>

              <div className="divider">
                <span>or continue with email</span>
              </div>

              <form className="auth-form" onSubmit={handleSubmit}>
                {mode === 'register' ? (
                  <label className="input-group">
                    <span>Player Name</span>
                    <input
                      type="text"
                      name="username"
                      placeholder="Enter your player name"
                      value={form.username}
                      onChange={handleChange}
                      autoComplete="username"
                    />
                  </label>
                ) : null}

                <label className="input-group">
                  <span>Email Address</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="user@example.com"
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
                      ? 'Logging In...'
                      : 'Creating Player...'
                    : mode === 'login'
                      ? 'Enter Game'
                      : 'Start Playing'}
                </button>
              </form>
            </div>
          </section>
        </main>
      )}
    </>
  );
}

export default App;
