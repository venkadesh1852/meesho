import { Logo } from '../components/Navigation'
import { navigateTo } from '../utils/navigation'

export function AdminLayout({ children, section, onLogout }) {
  const links = [['/admin/dashboard', 'Dashboard'], ['/admin/products', 'Products'], ['/admin/trending', 'Trending'], ['/admin/settings', 'Settings']]
  return <div className="admin-shell"><aside className="admin-sidebar"><Logo /><div className="admin-label">WORKSPACE</div><nav>{links.map(([href, label]) => <a key={href} className={section === label ? 'admin-nav-link active' : 'admin-nav-link'} href={href} onClick={(event) => { event.preventDefault(); navigateTo(href) }}>{label}</a>)}</nav><button className="admin-logout" onClick={onLogout}>Sign out</button></aside><div className="admin-main"><header className="admin-topbar"><div><span className="admin-kicker">REVIEWHUB ADMIN</span><h1>{section}</h1></div><button className="admin-profile"><span>AM</span><span>Admin account</span></button></header>{children}</div></div>
}
