import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import usePortal from 'react-useportal';

// Header Control
import { useTranslation, Trans } from 'react-i18next';
import useHeaderContext from 'hooks/useHeaderContext';

// Components
import WizardButtons from 'components/WizardButtons';
import LinkPurple from 'components/LinkPurple';

// Theme
import { colors } from 'theme';

// Utils
import { scrollToTop } from 'helper/scrollHelper';

// Styles
import {
  WelcomeBorderContainer,
  WelcomeContent,
  WelcomeSubtitle,
  WelcomeStyledFormAlternative,
  CoupleAboutUs,
  ShapeDownContainer,
} from '../style';

const Step3 = (p: Wizard.StepProps) => {
  const { Portal } = usePortal({
    bindTo: document && document.getElementById('wizard-buttons') as HTMLDivElement,
  });

  const [activeStep, setActiveStep] = useState(true);
  const {
    doGoBack, setDoGoBack, setTitle, title, setType, setLogoSize, setSubtitle,
  } = useHeaderContext();

  const history = useHistory();
  const { t, i18n } = useTranslation();
  const handleNext = React.useCallback(() => {
    if (p.nextStep) {
      setActiveStep(false);
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
    setType('shapeDown');
    setLogoSize('regular');
    setSubtitle(t('main:aboutUsTitle'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WelcomeStyledFormAlternative>
      <ShapeDownContainer>
        <WelcomeBorderContainer>
          <CoupleAboutUs />
        </WelcomeBorderContainer>
      </ShapeDownContainer>
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
              <LinkPurple to={`https://virufy.org/${i18n.language || 'en'}/our-approach`} target="_blank">Our research</LinkPurple> has shown that Al technology may be able to identify
              COVID&apos;s unique cough signature.
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
