/* eslint-disable func-names */
import React from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

declare global {

  interface App {
    id: string;
  }
  interface Navigator {
    standalone?: boolean; // Available on Apple's iOS Safari only.
    getInstalledRelatedApps?: () => Promise<App[] | null>; // Available on chrome only
  }
}

const usePWAHelpers = (buttonId: string) => {
  const deferredInstallPromptRef = React.useRef<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    // BeforeInstallPrompt
    const beforeInstallPromptFn = function (e: BeforeInstallPromptEvent) {
      e.preventDefault();
      deferredInstallPromptRef.current = e;
    };
    window.addEventListener('beforeinstallprompt', beforeInstallPromptFn as EventListener);

    // App Installed
    const appInstalledFn = () => {
      setIsInstalled(true);
    };
    window.addEventListener('appinstalled', appInstalledFn as EventListener);

    return () => {
      window.removeEventListener('beforeinstallprompt', beforeInstallPromptFn as EventListener);
      window.removeEventListener('appinstalled', appInstalledFn as EventListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    if (isStandalone) {
      setIsInstalled(true);
    } else if (window.navigator.getInstalledRelatedApps) {
      window.navigator.getInstalledRelatedApps().then(r => {
        if (r) {
          setIsInstalled(r.length > 0);
        }
      });
    }
  }, []);

  const handlePrompt = React.useCallback(async () => {
    if (deferredInstallPromptRef.current) {
      try {
        // Show the install prompt
        await deferredInstallPromptRef.current.prompt();
        // Return the user's choice
        const userChoice = await deferredInstallPromptRef.current.userChoice;
        return userChoice;
      } catch (error) {
        console.error('PWA prompt error:', error);
        return null;
      }
    }
    return null;
  }, []);

  return {
    isInstalled,
    setIsInstalled,
    handlePrompt,
  };
};

export default usePWAHelpers;