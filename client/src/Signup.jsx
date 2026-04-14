import { useState } from 'react';

export default function Signup({ onSwitchPage }) {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const [status, setStatus] = useState({ loading: false, message: '' });

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ loading: true, message: '' });

    // Simulate signup (replace with real API call)
    setTimeout(() => {
      const { fullName, email, password, confirmPassword, agreeTerms } = form;

      if (!fullName || !email || !password || !confirmPassword) {
        setStatus({ loading: false, message: 'Please fill in all fields.' });
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setStatus({ loading: false, message: 'Please enter a valid email address.' });
        return;
      }

      if (password.length < 6) {
        setStatus({ loading: false, message: 'Password must be at least 6 characters.' });
        return;
      }

      if (password !== confirmPassword) {
        setStatus({ loading: false, message: 'Passwords do not match.' });
        return;
      }

      if (!agreeTerms) {
        setStatus({ loading: false, message: 'You must agree to the terms to sign up.' });
        return;
      }

      setForm({ fullName: '', email: '', password: '', confirmPassword: '', agreeTerms: false });
      setStatus({ loading: false, message: 'Account created! Redirecting to login...' });
      // In a real app, redirect to dashboard or login after signup
    }, 600);
  }

  return (
    <main className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Create your account</h1>
            <p>Join Park and Ride to get started with parking management</p>
          </div>

          {status.message ? (
            <p className={`auth-status ${status.message.includes('created') || status.message.includes('successful') ? 'success' : 'error'}`}>
              {status.message}
            </p>
          ) : null}

          <form className="auth-form" onSubmit={handleSubmit}>
            <label>
              Full name
              <input
                type="text"
                value={form.fullName}
                onChange={(event) => setForm({ ...form, fullName: event.target.value })}
                placeholder="John Doe"
                required
              />
            </label>

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
                placeholder="At least 6 characters"
                required
              />
            </label>

            <label>
              Confirm password
              <input
                type="password"
                value={form.confirmPassword}
                onChange={(event) => setForm({ ...form, confirmPassword: event.target.value })}
                placeholder="••••••••"
                required
              />
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={form.agreeTerms}
                onChange={(event) => setForm({ ...form, agreeTerms: event.target.checked })}
              />
              I agree to the Terms of Service and Privacy Policy
            </label>

            <button className="primary-button auth-submit" type="submit" disabled={status.loading}>
              {status.loading ? 'Creating account...' : 'Sign up'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account?{' '}
              <button type="button" className="link-button" onClick={() => onSwitchPage('login')}>
                Sign in
              </button>
            </p>
          </div>
        </div>

        <div className="auth-side">
          <div className="auth-side-content">
            <h2>Join the network</h2>
            <p>Thousands of commuters are already using Park and Ride to find and reserve parking spots faster.</p>
            <ul className="feature-list">
              <li>Secure account management</li>
              <li>Instant confirmation</li>
              <li>Multi-city coverage</li>
              <li>Support team available 24/7</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
