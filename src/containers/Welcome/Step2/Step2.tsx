import React, { useEffect, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import usePortal from 'react-useportal';

// Header Control
import useHeaderContext from 'hooks/useHeaderContext';

// Components
import WizardButtons from 'components/WizardButtons';

// Hooks
import useWindowSize from 'hooks/useWindowSize';

// Theme
import { colors } from 'theme';

// Utils
import { scrollToTop } from 'helper/scrollHelper';

// Assets
import HeaderSplash from 'assets/images/headerSplash.png';
// Styles
import {
  WelcomeContent,
  WelcomeSubtitle,
  WelcomeStyledFormAlternative,
  HeaderImage,
  WelcomeBullets,
  BulletIndicator,
} from '../style';

const Step2 = (p: Wizard.StepProps) => {
  const { width } = useWindowSize();
  const { Portal } = usePortal({
    bindTo: document && document.getElementById('wizard-buttons') as HTMLDivElement,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeStep, setActiveStep] = useState(true);
  const { setDoGoBack } = useHeaderContext();

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
    scrollToTop();
    setDoGoBack(() => doBack);
  }, [doBack, setDoGoBack]);

  // Memos
  const isDesktop = React.useMemo(() => width && width > 560, [width]);

  const { t } = useTranslation();

  return (
    <WelcomeStyledFormAlternative>
      <HeaderImage
        src={HeaderSplash}
      />

      <WelcomeSubtitle
        mt={width && width > 560 ? 38 : 12}
        fontSize={isDesktop ? 32 : 24}
        fontColor="#3578DE"
        textAlign="center"
        isBold
      >
        {t('main:paragraph2', 'Covid-19 Cough Data Collection Study')}
      </WelcomeSubtitle>

      <WelcomeContent maxWidth={335}>
        <WelcomeSubtitle mt={0} mb={0} textAlign="left" fontColor={colors.mineShaft}>
          <Trans i18nKey="helpVirufy:introParagraph">
            <p>
              Welcome to our study! This should only take you about 5 minutes to complete.
              Before we begin, let’s discuss what we will cover:
            </p>
          </Trans>
        </WelcomeSubtitle>

        <WelcomeSubtitle mt={20} isBold textAlign="left">
          <WelcomeBullets>
            <BulletIndicator>1</BulletIndicator>
          </WelcomeBullets>
          <Trans i18nKey="helpVirufy:bulletsIntro">
            <strong>Intro:</strong>About us and Safety Reminders
          </Trans>
        </WelcomeSubtitle>
        <WelcomeSubtitle mt={20} isBold textAlign="left">
          <WelcomeBullets>
            <BulletIndicator>2</BulletIndicator>
          </WelcomeBullets>
          <Trans i18nKey="helpVirufy:bulletCough">
            <strong>Cough Into Phone</strong>
          </Trans>
        </WelcomeSubtitle>
        <WelcomeSubtitle mt={20} isBold textAlign="left">
          <WelcomeBullets>
            <BulletIndicator>3</BulletIndicator>
          </WelcomeBullets>
          <Trans i18nKey="helpVirufy:bulletQuestions">
            <strong>Quick Health Questions</strong>
          </Trans>
        </WelcomeSubtitle>

        {activeStep && (
          <Portal>
            <WizardButtons
              invert
              leftLabel={t('helpVirufy:nextButton')}
              leftHandler={handleNext}
            />
          </Portal>
        )}
      </WelcomeContent>
    </WelcomeStyledFormAlternative>
  );
};

export default React.memo(Step2);
