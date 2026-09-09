const cache = new Map();

export function loadJS(url) {
  // SSR: return a promise that never settles so callers' .then() (which
  // touches the DOM / CDN globals) never runs on the server
  if (typeof window === 'undefined') return new Promise(() => {});

  const pending = cache.get(url);
  if (pending) return pending;

  const loading = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = () => resolve();
    script.onerror = () => {
      // drop from cache so a later call can retry after a failed load
      cache.delete(url);
      reject(new Error(`Failed to load script: ${url}`));
    };
    document.head.appendChild(script);
  });

  cache.set(url, loading);
  return loading;
}
