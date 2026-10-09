import { useEffect, useMemo, useState } from 'react'
import { Icon } from '../components/Icons'
import { ProductCard } from '../components/ProductCard'
import { categories } from '../data/products'
import { getProducts } from '../services/productService'

export function Products() {
  const [products, setProducts] = useState([])
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState(() => window.sessionStorage.getItem('reviewhub-category') || 'All')
  const [sort, setSort] = useState('featured')
  useEffect(() => { getProducts().then(setProducts) }, [])
  const filteredProducts = useMemo(() => products.filter((product) => (category === 'All' || product.category === category) && `${product.name} ${product.category} ${product.shortReview}`.toLowerCase().includes(query.toLowerCase())).sort((a, b) => sort === 'price-low' ? a.price - b.price : sort === 'rating' ? b.rating - a.rating : a.trendingOrder - b.trendingOrder), [products, query, category, sort])
  return <main className="page-container page-content"><div className="page-intro"><span className="section-kicker">THE FULL EDIT</span><h1>Explore products</h1><p>Discover considered finds and read the review before you decide.</p></div><div className="discovery-toolbar"><label className="page-search"><Icon name="search" size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products, categories, or reviews" aria-label="Search products" /></label><div className="filter-actions"><select value={category} onChange={(event) => { setCategory(event.target.value); window.sessionStorage.setItem('reviewhub-category', event.target.value) }} aria-label="Filter by category"><option value="All">All categories</option>{categories.map((item) => <option key={item} value={item}>{item}</option>)}</select><select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort products"><option value="featured">Sort: Featured</option><option value="rating">Top rated</option><option value="price-low">Price: Low to high</option></select></div></div><div className="active-filter-row"><span>{filteredProducts.length} products found</span>{category !== 'All' && <button onClick={() => setCategory('All')}>{category} ×</button>}</div>{filteredProducts.length ? <div className="product-grid product-grid-wide">{filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="empty-state"><Icon name="search" size={22} /><h2>No products found</h2><p>Try a different word or category.</p><button className="primary-button" onClick={() => { setQuery(''); setCategory('All') }}>Clear filters</button></div>}</main>
}
