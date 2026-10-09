
import { Icon } from './Icons'
import { navigateTo } from '../utils/navigation'

export function ProductCard({ product, compact = false }) {
  const imageSrc = product?.imageUrl || product?.image || ''

  return (
    <article
      className={
        compact
          ? 'product-card product-card-compact'
          : 'product-card'
      }
    >
      <a
        className="product-card-image"
        href={`/product/${product.id}`}
        onClick={(event) => {
          event.preventDefault()
          navigateTo(`/product/${product.id}`)
        }}
      >
        <img
          src={imageSrc}
          alt={product?.name || 'Product image'}
          onError={(event) => {
            console.error('Image failed to load:', imageSrc)
          }}
        />

        {product?.isTrending && (
          <span className="trending-badge">Trending</span>
        )}
      </a>

      <div className="product-card-body">
        <span className="card-category">{product?.category}</span>

        <a
          href={`/product/${product.id}`}
          onClick={(event) => {
            event.preventDefault()
            navigateTo(`/product/${product.id}`)
          }}
        >
          <h3>{product?.name}</h3>
        </a>

        <div className="card-rating">
          <span>
            <Icon name="star" size={12} /> {product?.rating ?? 0}
          </span>
          <small>Honest review</small>
        </div>

        {!compact && <p>{product?.shortReview || ''}</p>}

        <div className="card-footer">
          <strong>
            ₹{Number(product?.price || 0).toLocaleString('en-IN')}
          </strong>

          <a
            href={`/product/${product.id}`}
            onClick={(event) => {
              event.preventDefault()
              navigateTo(`/product/${product.id}`)
            }}
          >
            View review <Icon name="arrow" size={13} />
          </a>
        </div>
      </div>
    </article>
  )
}

