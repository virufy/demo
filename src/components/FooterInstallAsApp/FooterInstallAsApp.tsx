


import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

// Modals
import PWAInstallModal from 'modals/PWAInstallModal';

// Hooks
import usePWAHelpers from 'hooks/usePWAHelpers';

// Styles
import { FooterContainer, DownloadSVG } from './style';

const FooterInstallAsApp = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const installPwaButtonId = 'virufy-install-button';
  const pwaModalRef = React.useRef<PWAInstallModal>(null);
  const { handlePrompt, isInstalled, setIsInstalled } = usePWAHelpers(installPwaButtonId);

  const handleClickInstall = React.useCallback(async () => {
    try {
      if (handlePrompt) {
        const result = await handlePrompt();
        if (result?.outcome === 'accepted') {
          setIsInstalled(true);
        } else {
          pwaModalRef.current?.show();
        }
      } else {
        pwaModalRef.current?.show();
      }
    } catch (error) {
      console.error('Install error:', error);
      pwaModalRef.current?.show();
    }
  }, [handlePrompt, setIsInstalled]);

  // Show ONLY on welcome pages
  if (location.pathname !== '/welcome' && location.pathname !== '/welcome/step-2') return null;

  return (
    <>
      {!isInstalled && (
        <FooterContainer 
          id={installPwaButtonId} 
          onClick={handleClickInstall}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleClickInstall()}
        >
          <DownloadSVG />
          {t('helpVirufy:installApp')}
        </FooterContainer>
      )}
      <PWAInstallModal ref={pwaModalRef} />
    </>
  );
};

export default React.memo(FooterInstallAsApp);