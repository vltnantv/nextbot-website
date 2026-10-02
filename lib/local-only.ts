// Tools that must exist only on Valentin's computer (e.g. the CORE import at /core/vnos).
// Both checks must pass: a development server (`npm run dev` - Vercel always builds for production)
// and a request to localhost. Everywhere else the page and its API answer 404.

const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '[::1]'])

export function isLocalRequest(host: string | null | undefined): boolean {
  if (process.env.NODE_ENV !== 'development') return false
  const name = (host ?? '').toLowerCase().replace(/:\d+$/, '')
  return LOCAL_HOSTS.has(name)
}
