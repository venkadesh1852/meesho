
import { Icon } from '../components/Icons'
import { navigateTo } from '../utils/navigation'
import { AdminPageIntro } from './AdminDashboard'

export function AdminProducts({
  products = [],
  onDelete,
  onTogglePublished,
  onToggleTrending,
}) {
  return (
    <AdminPageIntro
      title="Product collection"
      subtitle="Manage your products, prices, publishing status and trending items."
    >
      <div className="admin-list-toolbar">
        <div>
          <span className="admin-list-count">
            {products.length} products
          </span>
          <span className="admin-list-muted">
            {' '}· {products.filter((item) => item.published).length} published
          </span>
        </div>

        <button
          className="primary-button"
          onClick={() => navigateTo('/admin/products/add')}
        >
          <Icon name="plus" size={15} /> Add product
        </button>
      </div>

      {products.length === 0 ? (
        <div className="error-state">
          <h2>No products found</h2>
          <p>Add a product to see it in this collection.</p>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="table-product">
                      <img
                        src={product.imageUrl || product.image || ''}
                        alt={product.name || 'Product'}
                        onError={(event) => {
                          event.currentTarget.style.visibility = 'hidden'
                        }}
                      />
                      <strong>{product.name}</strong>
                    </div>
                  </td>

                  <td>{product.category || 'Uncategorized'}</td>

                  <td>
                    ₹{Number(product.price || 0).toLocaleString('en-IN')}
                  </td>

                  <td>
                    <span className="table-rating">
                      <Icon name="star" size={12} /> {product.rating || 0}
                    </span>
                  </td>

                  <td>
                    <span
                      className={
                        product.published
                          ? 'status-pill published'
                          : 'status-pill draft'
                      }
                    >
                      {product.published ? 'Published' : 'Draft'}
                    </span>

                    {product.isTrending && (
                      <span className="status-pill trending">
                        Trending
                      </span>
                    )}
                  </td>

                  <td>
                    <div className="table-actions">
                      <button
                        aria-label={`Edit ${product.name}`}
                        title="Edit product"
                        onClick={() =>
                          navigateTo(`/admin/products/edit/${product.id}`)
                        }
                      >
                        <Icon name="edit" size={15} />
                      </button>

                      <button
                        aria-label={`Toggle trending for ${product.name}`}
                        title="Toggle trending"
                        onClick={() => onToggleTrending?.(product.id)}
                      >
                        <Icon name="star" size={15} />
                      </button>

                      <button
                        aria-label={`Toggle published for ${product.name}`}
                        title="Toggle published"
                        onClick={() => onTogglePublished?.(product.id)}
                      >
                        <Icon name="check" size={15} />
                      </button>

                      <button
                        className="danger"
                        aria-label={`Delete ${product.name}`}
                        title="Delete product"
                        onClick={() => onDelete?.(product.id)}
                      >
                        <Icon name="trash" size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminPageIntro>
  )
}

