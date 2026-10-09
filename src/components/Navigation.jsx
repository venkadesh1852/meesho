import React from 'react'
import { Icon } from './Icons'
import { navigateTo } from '../utils/navigation'

export function Logo() {
  return <a className="brand" href="/" onClick={(event) => { event.preventDefault(); navigateTo('/') }}><span className="brand-mark">R</span><span>Review<span>Hub</span></span></a>
}

export function NavLink({ href, children, current }) {
  return <a className={current === href ? 'nav-link active' : 'nav-link'} href={href} onClick={(event) => { event.preventDefault(); navigateTo(href) }}>{children}</a>
}

export function Navbar({ path }) {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const publicPath = path.startsWith('/admin') ? '/' : path
  const closeMenu = () => setMenuOpen(false)
  return <header className="site-header"><div className="site-header-inner"><Logo /><nav className={menuOpen ? 'main-nav is-open' : 'main-nav'}><NavLink href="/" current={publicPath}>Home</NavLink><NavLink href="/products" current={publicPath}>Products</NavLink><NavLink href="/trending" current={publicPath}>Trending</NavLink><NavLink href="/about" current={publicPath}>About</NavLink></nav><div className="nav-tools"><a className="nav-search-link" href="/products" onClick={(event) => { event.preventDefault(); navigateTo('/products') }} aria-label="Search products"><Icon name="search" size={17} /></a><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation"><Icon name={menuOpen ? 'close' : 'menu'} size={21} /></button></div></div>{menuOpen && <button className="mobile-menu-close" onClick={closeMenu} aria-label="Close menu" />}</header>
}

