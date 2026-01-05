const swConfig = {
  onUpdate: (registration: ServiceWorkerRegistration) => {
    // Automatically reload when new service worker is available
    if (registration.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
    // Reload the page to get the new version
    window.location.reload();
  },
  onSuccess: (registration: ServiceWorkerRegistration) => {
    console.info('Service worker registered successfully');
    // Check for updates periodically (every 30 minutes)
    setInterval(() => {
      registration.update();
    }, 30 * 60 * 1000);
  },
};

export default swConfig;
