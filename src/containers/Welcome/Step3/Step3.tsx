import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import usePortal from 'react-useportal';

// Header Control
import { useTranslation, Trans } from 'react-i18next';
import useHeaderContext from 'hooks/useHeaderContext';

// Hooks
import useWindowSize from 'hooks/useWindowSize';

// Components
import WizardButtons from 'components/WizardButtons';

// Theme
import { colors } from 'theme';

// Utils
import { scrollToTop } from 'helper/scrollHelper';

// Styles
import {
  WelcomeHeaderContainer,
  WelcomeLogo,
  WelcomeBorderContainer,
  WelcomeContent,
  WelcomeSubtitle,
  WelcomeStyledFormAlternative,
  WelcomeNote,
  CoupleAboutUs,
  WelcomeTitle,
} from '../style';

const Step3 = (p: Wizard.StepProps) => {
  const { width } = useWindowSize();
  const { Portal } = usePortal({
    bindTo: document && document.getElementById('wizard-buttons') as HTMLDivElement,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeStep, setActiveStep] = useState(true);
  const {
    doGoBack, setDoGoBack, setTitle, title, setType, setLogoSize,
  } = useHeaderContext();

  const history = useHistory();

  const handleNext = React.useCallback(() => {
    if (p.nextStep) {
      history.push(p.nextStep);
    }
  }, [history, p.nextStep]);

  useEffect(() => {
    // Clear title if needed
    if (title) setTitle('');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  useEffect(() => {
    scrollToTop();
    if (doGoBack) setDoGoBack(null);
    setType('secondary');
    setLogoSize('regular');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { t } = useTranslation();

  return (
    <WelcomeStyledFormAlternative>
      <WelcomeHeaderContainer>
        <WelcomeLogo />
        <WelcomeTitle mb={width && width > 560 ? 90 : 50} mt={15} fontColor="#3578DE" fontSize={32}>{t('main:aboutUsTitle')}</WelcomeTitle>
        <WelcomeBorderContainer>
          <CoupleAboutUs />
        </WelcomeBorderContainer>
      </WelcomeHeaderContainer>
      <WelcomeContent mt={21}>
        <WelcomeSubtitle mt={0} mb={0} textAlign="left" fontColor={colors.mineShaft} isBold>
          <Trans i18nKey="helpVirufy:aboutParagraph">
            <p>
              Virufy is a <strong>nonprofit organization</strong> that is working to develop the means to
              use <strong> artificial intelligence (Al) to screen for COVID-19 from cough patterns</strong>
              rapidly and at no cost through use of a smartphone
              for the benefit of low-income countries.
            </p>
            <p>
              Our team includes researchers from over <strong>25 countries</strong>.
              Our research has shown that Al technology may be able to identify COVID&apos;s unique cough signature.
            </p>
            <p>
              By collecting <strong>coughs recordings</strong> from people around the world,
              Virufy is improving the robustness of its AI algorithm in recognizing COVID&apos;s unique sound pattern.
            </p>
            <p>
              <strong>You have the power</strong>to help benefit millions of
              people across the globe by <strong>contributing your cough</strong> in our study.
            </p>
          </Trans>
        </WelcomeSubtitle>
        <WelcomeNote>
          <Trans i18nKey="main:note">
            <strong>Please note:</strong> This form is for data collection only. It will not predict your COVID-19
            status or diagnose any disease, disorder, or other health condition. Virufy is conducting research and
            will use the information you provide for that research only. Virufy will not take place of a doctor and
            would like to remind you it is your responsibility to seek medical advice from your doctor.
          </Trans>
        </WelcomeNote>
      </WelcomeContent>

      {activeStep && (
        <Portal>
          <WizardButtons
            leftLabel={t('main:nextButton')}
            leftHandler={handleNext}
            invert
          />
        </Portal>
      )}

    </WelcomeStyledFormAlternative>
  );
};

export default React.memo(Step3);
