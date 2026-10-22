// Vite supplies the public base path for both local previews and GitHub Pages.
export function assetUrl(path, base = import.meta.env?.BASE_URL ?? '/') {
  return `${base.replace(/\/?$/, '/')}${path.replace(/^\/+/, '')}`;
}
