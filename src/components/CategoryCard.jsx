import { navigateTo } from '../utils/navigation'

export function CategoryCard({ name, count, tone }) {
  return <button className="category-card" onClick={() => { window.sessionStorage.setItem('reviewhub-category', name); navigateTo('/products') }}><span className={`category-card-icon ${tone}`}>{name.charAt(0)}</span><strong>{name}</strong><small>{count} finds</small><span className="category-card-arrow">→</span></button>
}
