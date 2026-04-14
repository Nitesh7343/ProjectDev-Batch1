import { useState } from 'react';

export default function Login({ onSwitchPage }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [status, setStatus] = useState({ loading: false, message: '' });

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ loading: true, message: '' });

    // Simulate login (replace with real API call)
    setTimeout(() => {
      const email = form.email.trim();
      const password = form.password.trim();

      if (!email || !password) {
        setStatus({ loading: false, message: 'Please fill in all fields.' });
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setStatus({ loading: false, message: 'Please enter a valid email address.' });
        return;
      }

      // On success, clear form and show message
      setForm({ email: '', password: '' });
      setStatus({ loading: false, message: 'Login successful! Redirecting...' });
      // In a real app, redirect to dashboard after login
    }, 600);
  }

  return (
    <main className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Welcome back</h1>
            <p>Sign in to manage your parking reservations</p>
          </div>

          {status.message ? (
            <p className={`auth-status ${status.message.includes('successful') ? 'success' : 'error'}`}>
              {status.message}
            </p>
          ) : null}

          <form className="auth-form" onSubmit={handleSubmit}>
            <label>
              Email address
              <input
                type="email"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                placeholder="you@example.com"
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                value={form.password}
                onChange={(event) => setForm({ ...form, password: event.target.value })}
                placeholder="••••••••"
                required
              />
            </label>

            <div className="auth-remember">
              <label className="checkbox-label">
                <input type="checkbox" />
                Remember me
              </label>
              <a href="#" className="link-secondary">Forgot password?</a>
            </div>

            <button className="primary-button auth-submit" type="submit" disabled={status.loading}>
              {status.loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account?{' '}
              <button type="button" className="link-button" onClick={() => onSwitchPage('signup')}>
                Sign up
              </button>
            </p>
          </div>
        </div>

        <div className="auth-side">
          <div className="auth-side-content">
            <h2>Park and Ride</h2>
            <p>Manage commuter parking with ease. Reserve spots, track availability, and connect with transit in one dashboard.</p>
            <ul className="feature-list">
              <li>Real-time parking availability</li>
              <li>Quick reservations</li>
              <li>Transit-connected lots</li>
              <li>Budget-friendly options</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
