import { useState } from 'react'
import { Icon } from '../components/Icons'
import { AdminPageIntro } from './AdminDashboard'

export function AdminTrending({ products, onToggleTrending }) {
  const [message, setMessage] = useState('')
  const trending = products.filter((product) => product.isTrending)
  const toggle = (id) => { if (!products.find((product) => product.id === id)?.isTrending && trending.length >= 6) { setMessage('You can feature up to 6 trending products.'); return } onToggleTrending(id); setMessage('') }
  return <AdminPageIntro title="Manage trending" subtitle="Choose the six products that should lead your discovery experience."><div className="trending-admin-note"><Icon name="star" size={17} /><span><strong>{trending.length} of 6 spots selected</strong><small>Hero rotation uses display order and active dates.</small></span></div>{message && <div className="form-message error-message">{message}</div>}<div className="trending-admin-list">{products.map((product) => <div className={product.isTrending ? 'trending-admin-row selected' : 'trending-admin-row'} key={product.id}><div className="drag-number">{product.isTrending ? product.trendingOrder : '—'}</div><img src={product.image} alt="" /><div className="trending-row-name"><strong>{product.name}</strong><small>{product.category}</small></div><label>Start date<input type="date" defaultValue={product.trendingStartDate} /></label><label>End date<input type="date" defaultValue={product.trendingEndDate} /></label><button className={product.isTrending ? 'remove-trending' : 'add-trending'} onClick={() => toggle(product.id)}>{product.isTrending ? 'Remove' : 'Add to trending'}</button></div>)}</div></AdminPageIntro>
}
