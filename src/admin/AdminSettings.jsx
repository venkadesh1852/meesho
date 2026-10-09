import { useState } from 'react'
import { AdminPageIntro } from './AdminDashboard'

export function AdminSettings() {
  const [saved, setSaved] = useState(false)
  return <AdminPageIntro title="Settings" subtitle="Keep your workspace details up to date."><div className="settings-grid"><form className="form-card" onSubmit={(event) => { event.preventDefault(); setSaved(true) }}><h3>Account details</h3><label>Email address<input type="email" defaultValue="admin@reviewhub.co" /></label><label>Display name<input defaultValue="Amelia Morgan" /></label><button className="primary-button" type="submit">Save account details</button></form><form className="form-card" onSubmit={(event) => { event.preventDefault(); setSaved(true) }}><h3>Change password</h3><p className="settings-note">Password changes will be securely handled by Supabase Auth when the backend is connected.</p><label>Current password<input type="password" placeholder="Current password" /></label><label>New password<input type="password" placeholder="New password" /></label><button className="outline-button" type="submit">Update password</button></form></div>{saved && <div className="form-message success-message">Your settings are ready to be saved when authentication is connected.</div>}</AdminPageIntro>
}
