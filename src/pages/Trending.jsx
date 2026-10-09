import { useEffect, useState } from 'react'
import { ProductCard } from '../components/ProductCard'
import { getTrendingProducts } from '../services/productService'

export function Trending() {
  const [products, setProducts] = useState([])
  useEffect(() => { getTrendingProducts().then(setProducts) }, [])
  return <main className="page-container page-content"><div className="page-intro intro-split"><div><span className="section-kicker">REVIEWHUB SIGNAL</span><h1>Trending products</h1><p>Updated regularly from the products our community is watching.</p></div><span className="update-pill"><i /> Updated regularly</span></div><div className="product-grid product-grid-wide">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div></main>
}
