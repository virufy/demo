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
import H4RLogo from 'assets/images/supporters/h4r-logo.png';
import H4RLogo_2x from 'assets/images/supporters/h4r-logo@2x.png';
import H4RLogo_3x from 'assets/images/supporters/h4r-logo@3x.png';
import OYWBlue from 'assets/images/supporters/OYW_blue.png';
import OYWBlue_2x from 'assets/images/supporters/OYW_blue@2x.png';
import OYWBlue_3x from 'assets/images/supporters/OYW_blue@3x.png';
// Styles
import {
  WelcomeLogo,
  WelcomeTitle,
  WelcomeContent,
  WelcomeSubtitle,
  WelcomeStyledFormAlternative,
  WomanWithPhoneFront,
  SupportersTitle,
  SupportersLogos,
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

  const { t } = useTranslation();

  return (
    <WelcomeStyledFormAlternative>
      <WelcomeLogo />

      <WelcomeTitle
        mt={width && width > 560 ? 38 : 12}
      >
        {t('helpVirufy:title')}
      </WelcomeTitle>

      <WomanWithPhoneFront />

      <WelcomeContent maxWidth={320}>
        <WelcomeSubtitle fontWeight={400} mt={0} mb={0} textAlign="left" fontColor={colors.darkBlack}>
          <Trans i18nKey="helpVirufy:aboutParagraph">
            <p>
              Virufy is a nonprofit organization that is working to develop the means to use artificial intelligence
              (Al) to screen for COVID-19 from cough patterns rapidly and at no cost through use of a smartphone.
            </p>
            <p>
              Our team includes researchers from 25 countries and our focus is low-income countries. Our research has
              shown that Al technology may be able to identify COVID&apos;s unique cough signature.
            </p>
            <p>
              By collecting coughs recordings from people around the world, Virufy is improving the robustness of its AI
              algorithm in recognizing COVID&apos;s unique sound pattern.
            </p>
            <p>
              You have the power to help benefit millions of people across the globe by contributing your cough in our
              study.
            </p>
          </Trans>
        </WelcomeSubtitle>

        <SupportersTitle>
          {t('helpVirufy:ourSupporters', 'Our Supporters')}
        </SupportersTitle>
        <SupportersLogos>
          <picture>
            <source
              srcSet={
                `${H4RLogo_2x} 2x`
                + `, ${H4RLogo_3x} 3x`
              }
            />
            <img src={H4RLogo} alt="Stanford - Hacking 4 Recovery" />
          </picture>
          <picture>
            <source
              srcSet={
                `${OYWBlue_2x} 2x`
                + `, ${OYWBlue_3x} 3x`
              }
            />
            <img src={OYWBlue} alt="One Young World" />
          </picture>
        </SupportersLogos>
      </WelcomeContent>

      {activeStep && (
        <Portal>
          <WizardButtons
            invert
            leftLabel={t('helpVirufy:nextButton')}
            leftHandler={handleNext}
          />
        </Portal>
      )}

    </WelcomeStyledFormAlternative>
  );
};

export default React.memo(Step2);
