import { useState } from 'react'
import { Icon } from '../components/Icons'
import { Logo } from '../components/Navigation'
import { navigateTo } from '../utils/navigation'

export function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const submit = (event) => { event.preventDefault(); if (!email || !password) { setMessage('Enter your email and password to continue.'); return } onLogin() }
  return <main className="admin-login-page"><div className="login-decoration"><span className="eyebrow"><Icon name="star" size={12} /> PRIVATE WORKSPACE</span><h1>Keep every<br /><em>good find</em> moving.</h1><p>Manage your product collection, editorial reviews, and trending picks from one calm workspace.</p></div><div className="login-card"><Logo /><div className="login-heading"><span className="section-kicker">WELCOME BACK</span><h2>Admin login</h2><p>Sign in to manage ReviewHub.</p></div><form onSubmit={submit}><label>Email address<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></label><label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" /></label>{message && <div className="form-message error-message">{message}</div>}<button className="primary-button" type="submit">Sign in <Icon name="arrow" size={15} /></button></form><button className="forgot-button" onClick={() => setMessage('Password reset will be connected to Supabase Auth later.')}>Forgot password?</button><button className="back-link login-back" onClick={() => navigateTo('/')}>← Return to ReviewHub</button></div></main>
}
