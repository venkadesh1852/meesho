
import { useEffect, useState } from 'react'
import { Icon } from '../components/Icons'
import { navigateTo } from '../utils/navigation'
import { ProductCard } from '../components/ProductCard'
import {
  getProduct,
  getProducts,
} from '../services/productService'

const saveRecentlyViewed = (product) => {
  try {
    const stored = JSON.parse(
      window.localStorage.getItem('reviewhub-recent') || '[]'
    )

    const next = [
      product.id,
      ...stored.filter((id) => id !== product.id),
    ].slice(0, 6)

    window.localStorage.setItem(
      'reviewhub-recent',
      JSON.stringify(next)
    )
  } catch (error) {
    console.error('Could not save recently viewed product:', error)
  }
}

export function ProductDetails({ id }) {
  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    const loadProduct = async () => {
      setLoading(true)
      setError('')
      setProduct(null)

      try {
        const [item, allProducts] = await Promise.all([
          getProduct(id),
          getProducts(),
        ])

        if (!item) {
          throw new Error('Product not found.')
        }

        if (!active) return

        setProduct(item)
        setRelated(allProducts)
        saveRecentlyViewed(item)
      } catch (err) {
        console.error('Product details error:', err)

        if (active) {
          setError(err.message || 'Could not load product details.')
        }
      } finally {
        if (active) setLoading(false)
      }
    }

    loadProduct()

    return () => {
      active = false
    }
  }, [id])

  if (loading) {
    return (
      <main className="page-container page-content">
        <p>Loading product details...</p>
      </main>
    )
  }

  if (error || !product) {
    return (
      <main className="page-container page-content">
        <div className="error-state">
          <span className="section-kicker">PRODUCT NOT FOUND</span>
          <h1>Unable to load this product.</h1>
          <p>{error || 'Please try again.'}</p>
          <button
            className="primary-button"
            onClick={() => navigateTo('/products')}
          >
            Explore products
          </button>
        </div>
      </main>
    )
  }

  const ratings = product.detailedRatings || {}
  const pros = Array.isArray(product.pros) ? product.pros : []
  const cons = Array.isArray(product.cons) ? product.cons : []
  const sizes = Array.isArray(product.sizes) ? product.sizes : []

  const relatedProducts = related
    .filter(
      (item) =>
        item.category === product.category &&
        String(item.id) !== String(product.id)
    )
    .slice(0, 3)

  return (
    <main className="page-container page-content detail-page">
      <button
        className="back-link"
        onClick={() => navigateTo('/products')}
      >
        ← Back to products
      </button>

      <div className="breadcrumb">
        Products <span>/</span> {product.category}
        <span>/</span> <strong>{product.name}</strong>
      </div>

      <section className="detail-layout">
        <div
          className={`detail-image ${
            product.isTrending ? 'has-trending' : ''
          }`}
        >
          <img
            src={product.imageUrl || product.image || ''}
            alt={product.name}
            onError={(event) => {
              console.error(
                'Product details image failed:',
                event.currentTarget.src
              )
            }}
          />

          {product.isTrending && (
            <span className="trending-badge">Trending now</span>
          )}
        </div>

        <div className="detail-copy">
          <span className="card-category">{product.category}</span>
          <h1>{product.name}</h1>

          <div className="detail-rating">
            <span>
              <Icon name="star" size={15} /> {product.rating}
            </span>
            <small>Honest manual review</small>
          </div>

          <p className="detail-description">{product.description}</p>

          <div className="detail-price">
            ₹{Number(product.price || 0).toLocaleString('en-IN')}
          </div>

          <div className="detail-specs">
            <div>
              <small>Material</small>
              <strong>{product.material || 'Not specified'}</strong>
            </div>

            <div>
              <small>Colour</small>
              <strong>{product.colour || 'Not specified'}</strong>
            </div>

            <div>
              <small>Available sizes</small>
              <strong>{sizes.length ? sizes.join(' · ') : 'Not specified'}</strong>
            </div>
          </div>

          <div className="detail-actions">
            {product.meeshoUrl && (
              <a
                className="primary-button"
                href={product.meeshoUrl}
                target="_blank"
                rel="noreferrer"
              >
                View on Meesho <Icon name="arrow" size={16} />
              </a>
            )}

            {product.instagramUrl && (
              <a
                className="outline-button"
                href={product.instagramUrl}
                target="_blank"
                rel="noreferrer"
              >
                Watch Instagram review
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="review-section">
        <div className="review-panel">
          <span className="section-kicker">THE BREAKDOWN</span>
          <h2>How it holds up</h2>

          {Object.entries(ratings).map(([label, value]) => (
            <div className="rating-line" key={label}>
              <span>{label}</span>
              <div>
                <i
                  style={{
                    width: `${Math.max(
                      0,
                      Math.min(5, Number(value) || 0)
                    ) * 20}%`,
                  }}
                />
              </div>
              <strong>{value}/5</strong>
            </div>
          ))}
        </div>

        <div className="review-panel pros-cons">
          <div>
            <span className="review-label good">PROS</span>
            {pros.map((item, index) => (
              <p key={`${item}-${index}`}>
                <Icon name="check" size={13} /> {item}
              </p>
            ))}
          </div>

          <div>
            <span className="review-label caution">CONS</span>
            {cons.map((item, index) => (
              <p key={`${item}-${index}`}>× {item}</p>
            ))}
          </div>
        </div>

        {product.personalReview && (
          <div className="personal-review">
            <span className="section-kicker">PERSONAL REVIEW</span>
            <p>“{product.personalReview}”</p>
            <small>ReviewHub editorial note</small>
          </div>
        )}
      </section>

      {relatedProducts.length > 0 && (
        <section className="related-section">
          <div className="section-heading">
            <div>
              <span className="section-kicker">KEEP EXPLORING</span>
              <h2>Related products</h2>
            </div>
          </div>

          <div className="product-grid">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} compact />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}

