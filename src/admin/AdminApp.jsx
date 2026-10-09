
import { useEffect, useState } from 'react'
import { navigateTo } from '../utils/navigation'
import {
  getAllProducts,
} from '../services/productService'
import { AdminDashboard } from './AdminDashboard'
import { AdminLayout } from './AdminLayout'
import { AdminLogin } from './AdminLogin'
import { AdminProducts } from './AdminProducts'
import { AdminSettings } from './AdminSettings'
import { AdminTrending } from './AdminTrending'
import { ProductForm } from './ProductForm'

export function AdminApp({ path }) {
  const [authenticated, setAuthenticated] = useState(
    () => window.sessionStorage.getItem('reviewhub-admin') === 'true'
  )

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    if (!authenticated) return

    let active = true

    const loadProducts = async () => {
      setLoading(true)
      setLoadError('')

      try {
        const data = await getAllProducts()

        if (active) setProducts(data)
      } catch (error) {
        console.error('Admin products loading error:', error)

        if (active) {
          setLoadError('Products load aagala. Please try again.')
        }
      } finally {
        if (active) setLoading(false)
      }
    }

    loadProducts()

    return () => {
      active = false
    }
  }, [authenticated, path])

  const login = () => {
    window.sessionStorage.setItem('reviewhub-admin', 'true')
    setAuthenticated(true)
    navigateTo('/admin/dashboard')
  }

  const logout = () => {
    window.sessionStorage.removeItem('reviewhub-admin')
    setAuthenticated(false)
    navigateTo('/admin/login')
  }

  if (!authenticated) {
    return <AdminLogin onLogin={login} />
  }

  const section = path.includes('/products')
    ? 'Products'
    : path.includes('/trending')
      ? 'Trending'
      : path.includes('/settings')
        ? 'Settings'
        : 'Dashboard'

  const saveProduct = async () => {
    try {
      const data = await getAllProducts()
      setProducts(data)
      navigateTo('/admin/products')
    } catch (error) {
      console.error('Could not refresh products:', error)
      setLoadError('Product save aana piragu list refresh aagala.')
    }
  }

  const deleteProduct = async (id) => {
    alert('Delete functionality next step-la Supabase-oda connect pannuvom.')
  }

  const toggleProduct = async (id, key) => {
    alert('Publish/Trending update functionality next step-la Supabase-oda connect pannuvom.')
  }

  let content = <AdminDashboard products={products} />

  if (loading) {
    content = <p>Products loading...</p>
  } else if (loadError) {
    content = <p>{loadError}</p>
  } else if (path === '/admin/products') {
    content = (
      <AdminProducts
        products={products}
        onDelete={deleteProduct}
        onTogglePublished={(id) => toggleProduct(id, 'published')}
        onToggleTrending={(id) => toggleProduct(id, 'isTrending')}
      />
    )
  } else if (path === '/admin/products/add') {
    content = <ProductForm onSave={saveProduct} />
  } else if (path.startsWith('/admin/products/edit/')) {
    const product = products.find(
      (item) => String(item.id) === path.split('/').pop()
    )

    content = product
      ? <ProductForm product={product} onSave={saveProduct} />
      : <p>Product loading or not found.</p>
  } else if (path === '/admin/trending') {
    content = (
      <AdminTrending
        products={products}
        onToggleTrending={(id) => toggleProduct(id, 'isTrending')}
      />
    )
  } else if (path === '/admin/settings') {
    content = <AdminSettings />
  }

  return (
    <AdminLayout section={section} onLogout={logout}>
      {content}
    </AdminLayout>
  )
}

