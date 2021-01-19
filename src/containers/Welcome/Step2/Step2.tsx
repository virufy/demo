import React, { useEffect, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import usePortal from 'react-useportal';

// Header Control
import { useTranslation } from 'react-i18next';
import useHeaderContext from 'hooks/useHeaderContext';

// Components
import WizardButtons from 'components/WizardButtons';

// Hooks
import useWindowSize from 'hooks/useWindowSize';

// Theme
import { colors } from 'theme';

// Utils
import { scrollToTop } from 'helper/scrollHelper';

// Styles
import {
  WelcomeLogo,
  WelcomeTitle,
  WelcomeContent,
  WelcomeSubtitle,
  WelcomeItemList,
  WelcomeItemListItem,
  WelcomeStyledFormAlternative,
} from '../style';

const Step2 = (p: Wizard.StepProps) => {
  const { width } = useWindowSize();
  const { Portal } = usePortal({
    bindTo: document && document.getElementById('wizard-buttons') as HTMLDivElement,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeStep, setActiveStep] = useState(true);
  const { setDoGoBack, setTitle, title } = useHeaderContext();

  const history = useHistory();

  const handleNext = React.useCallback(() => {
    if (p.nextStep) {
      history.push(p.nextStep);
    }
  }, [history, p.nextStep]);

  const doBack = useCallback(() => {
    if (p.previousStep) {
      setActiveStep(false);
      history.push(p.previousStep);
    } else {
      history.goBack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Clear title if needed
    if (title) setTitle('');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  useEffect(() => {
    scrollToTop();
    setDoGoBack(() => doBack);
  }, [doBack, setDoGoBack]);

  const { t } = useTranslation();

  return (
    <WelcomeStyledFormAlternative>
      <WelcomeLogo />

      <WelcomeTitle mt={width && width > 560 ? 38 : 12}>{t('beforeStart:title')}</WelcomeTitle>

      <WelcomeContent>
        <WelcomeSubtitle
          fontWeight={700}
          fontColor={colors.darkBlack}
          mb={width && width > 560 ? 11 : 1}
          mt={width && width > 560 ? -10 : -14}
          textAlign={width && width > 560 ? 'center' : 'left'}
        >
          {t('beforeStart:subtitle')}
        </WelcomeSubtitle>
      </WelcomeContent>

      <WelcomeItemList>
        <WelcomeItemListItem>{t('beforeStart:advise1')}</WelcomeItemListItem>
        <WelcomeItemListItem>{t('beforeStart:advise2')}</WelcomeItemListItem>
        <WelcomeItemListItem>{t('beforeStart:advise3')}</WelcomeItemListItem>
        <WelcomeItemListItem>{t('beforeStart:advise4')}</WelcomeItemListItem>
      </WelcomeItemList>

      {activeStep && (
        <Portal>
          <WizardButtons
            leftLabel={t('beforeStart:startButton')}
            leftHandler={handleNext}
            invert
          />
        </Portal>
      )}

    </WelcomeStyledFormAlternative>
  );
};

export default React.memo(Step2);
