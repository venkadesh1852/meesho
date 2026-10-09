import { useEffect, useState } from 'react'
import { LoadingScreen } from './components/LoadingScreen'
import { Navbar } from './components/Navigation'
import { AdminApp } from './admin/AdminApp'
import { About } from './pages/About'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { ProductDetails } from './pages/ProductDetails'
import { Products } from './pages/Products'
import { Trending } from './pages/Trending'
import './App.css'

function getPath() { return window.location.pathname.replace(/\/$/, '') || '/' }

function App() {
  const [path, setPath] = useState(getPath)
  const [loading, setLoading] = useState(true)
  useEffect(() => { const timer = window.setTimeout(() => setLoading(false), 1100); const onNavigate = () => setPath(getPath()); window.addEventListener('popstate', onNavigate); window.addEventListener('reviewhub:navigate', onNavigate); return () => { window.clearTimeout(timer); window.removeEventListener('popstate', onNavigate); window.removeEventListener('reviewhub:navigate', onNavigate) } }, [])
  if (loading) return <LoadingScreen />
  if (path.startsWith('/admin')) return <AdminApp path={path} />
  let page = <NotFound />
  if (path === '/') page = <Home />
  if (path === '/products') page = <Products />
  if (path === '/trending') page = <Trending />
  if (path === '/about') page = <About />
  if (path.startsWith('/product/')) page = <ProductDetails id={path.split('/').pop()} />
  return <div className="app-shell"><Navbar path={path} />{page}<footer className="site-footer"><div className="page-container footer-inner"><span className="brand-mark">R</span><span>ReviewHub · Discover. Review. Decide.</span><nav><a href="/products">Products</a><a href="/about">About</a><a href="/admin">Admin</a></nav></div></footer></div>
}

export default App
