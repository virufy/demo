import React, { useEffect, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import usePortal from 'react-useportal';

// Header Control
import { useTranslation, Trans } from 'react-i18next';
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

const defaultAdviseList = [
  'Use your own device to record the cough sample and wear a mask when appropriate.',
  'Disinfect your device and any affected or nearby surfaces after recording your cough.',
  'If you have an underlying condition that increases your risk from coughing, please check with your healthcare provider before participating.',
  'If you have any symptoms or any questions or concerns about your health condition, please contact your healthcare provider.',
  'If you feel your symptoms are getting worse, please contact your local medical emergency services or first responders immediately.',
];

const Step4 = (p: Wizard.StepProps) => {
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

  const adviseList: string[] = t('beforeStart:advise_list', { returnObjects: true, defaultValue: defaultAdviseList });

  return (
    <WelcomeStyledFormAlternative>
      <WelcomeLogo />

      <WelcomeTitle
        mt={width && width > 560 ? 32 : 30}
        textAlign={width && width > 560 ? 'center' : 'left'}
      >
        {t('beforeStart:title')}
      </WelcomeTitle>

      <WelcomeContent mt={40}>
        <WelcomeSubtitle
          fontColor={colors.darkBlack}
          mb={16}
          mt={0}
          textAlign={width && width > 560 ? 'center' : 'left'}
        >
          {t('beforeStart:subtitle')}
        </WelcomeSubtitle>

        <WelcomeSubtitle mt={0} mb={0} textAlign="left" fontColor={colors.darkBlack}>
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
      </WelcomeContent>

      <WelcomeItemList>
        {adviseList.map((advise, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <WelcomeItemListItem key={`advise_${idx}`}>{advise}</WelcomeItemListItem>
        ))}
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

export default React.memo(Step4);
