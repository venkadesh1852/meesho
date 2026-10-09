import { Icon } from '../components/Icons'
import { navigateTo } from '../utils/navigation'

export function AdminDashboard({ products }) {
  const stats = [['Total products', products.length, 'collection'], ['Published products', products.filter((item) => item.published).length, 'published'], ['Trending products', products.filter((item) => item.isTrending).length, 'trending'], ['Categories', new Set(products.map((item) => item.category)).size, 'categories']]
  return <AdminPageIntro title="Good morning, Amelia" subtitle="Here’s what is happening with your collection today."><div className="admin-stat-grid">{stats.map(([label, value, tone]) => <div className={`admin-stat-card ${tone}`} key={label}><span>{label}</span><strong>{value}</strong><small>Updated just now</small></div>)}</div><div className="admin-quick-grid"><button onClick={() => navigateTo('/admin/products/add')}><Icon name="plus" size={18} /><strong>Add product</strong><span>Create a new discovery</span></button><button onClick={() => navigateTo('/admin/products')}><Icon name="edit" size={18} /><strong>Manage products</strong><span>Edit your collection</span></button><button onClick={() => navigateTo('/admin/trending')}><Icon name="star" size={18} /><strong>Manage trending</strong><span>Choose the hero picks</span></button><button onClick={() => navigateTo('/admin/settings')}><Icon name="settings" size={18} /><strong>Settings</strong><span>Update your workspace</span></button></div></AdminPageIntro>
}

export function AdminPageIntro({ title, subtitle, children }) { return <section className="admin-content"><div className="admin-page-heading"><div><h2>{title}</h2><p>{subtitle}</p></div></div>{children}</section> }
