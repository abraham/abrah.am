function registerSW(): Promise<ServiceWorkerRegistration | void> {
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    return navigator.serviceWorker.register('/sw.js');
  }
  return Promise.resolve();
}

function importComponents(): Promise<unknown[]> {
  return Promise.all([import('node-package'), import('github-repository')]);
}

importComponents()
  .then(registerSW)
  .catch((error: Error) => console.log(`Error importing dependencies or registering Service Worker: ${error}`));
