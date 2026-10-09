import { navigateTo } from '../utils/navigation'

export function NotFound() { return <main className="page-container page-content error-state"><span className="section-kicker">404</span><h1>That page is not in the collection.</h1><p>Let’s get you back to the good finds.</p><button className="primary-button" onClick={() => navigateTo('/')}>Back home</button></main> }
