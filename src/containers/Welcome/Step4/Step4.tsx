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
  WelcomeHeaderContainer,
  WelcomeLogo,
  WelcomeTitle,
  WelcomeContent,
  WelcomeSubtitle,
  WelcomeItemList,
  WelcomeItemListItem,
  WelcomeStyledFormAlternative,
  WelcomeBorderContainer,
} from '../style';

const defaultAdviseList = [
  'Please use your own device and wear a mask when appropriate.',
  'Disinfect your device and any affected or nearby surfaces after recording your cough/speech.',
  'If you have an underlying condition that increases your risk from coughing, please check with your health care provider before participating.',
  'If you feel your symptoms are getting worse, please contact your local medical response',
];

const Step4 = (p: Wizard.StepProps) => {
  const { width } = useWindowSize();
  const { Portal } = usePortal({
    bindTo: document && document.getElementById('wizard-buttons') as HTMLDivElement,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeStep, setActiveStep] = useState(true);
  const {
    setDoGoBack, setTitle, title, setType, setLogoSize,
  } = useHeaderContext();

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

  useEffect(() => {
    setType('secondary');
    setLogoSize('regular');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { t } = useTranslation();

  const adviseList: string[] = t('beforeStart:advise_list', { returnObjects: true, defaultValue: defaultAdviseList });

  return (
    <WelcomeStyledFormAlternative>
      <WelcomeHeaderContainer>
        <WelcomeLogo />
        <WelcomeTitle
          mt={width && width > 560 ? 32 : 30}
          textAlign="center"
          fontColor="#3578DE"
        >
          {t('beforeStart:title')}
        </WelcomeTitle>
        <WelcomeBorderContainer>
          <WelcomeSubtitle
            fontColor={colors.mineShaft}
            mb={15}
            mt={40}
            textAlign="left"
            isBold
          >
            {t('beforeStart:subtitle')}
          </WelcomeSubtitle>
        </WelcomeBorderContainer>
      </WelcomeHeaderContainer>
      <WelcomeContent mt={40}>
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
      </WelcomeContent>
    </WelcomeStyledFormAlternative>
  );
};

export default React.memo(Step4);
