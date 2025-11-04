const swConfig = {
  onUpdate: (registration: ServiceWorkerRegistration) => {
    // eslint-disable-next-line no-restricted-globals, no-alert
    const shouldReload = confirm('A new version is available. Do you want to update?');
    if (shouldReload) {
      registration.unregister().then(() => {
        window.location.replace(process.env.PUBLIC_URL);
      });
    }
  },
  onSuccess: (registration: ServiceWorkerRegistration) => {
    console.info('service worker on success state');
    console.log(registration);
  },
};

export default swConfig;
