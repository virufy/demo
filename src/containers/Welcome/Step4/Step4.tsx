import React, { useEffect, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import usePortal from 'react-useportal';

// Header Control
import { useTranslation } from 'react-i18next';
import useHeaderContext from 'hooks/useHeaderContext';

// Components
import WizardButtons from 'components/WizardButtons';

// Theme
import { colors } from 'theme';

// Utils
import { scrollToTop } from 'helper/scrollHelper';

// Styles
import {
  WelcomeContent,
  WelcomeSubtitle,
  WelcomeItemList,
  WelcomeItemListItem,
  WelcomeStyledFormAlternative,
  WelcomeBorderContainer,
  ShapeDownContainer,
} from '../style';

const defaultAdviseList = [
  'Please use your own device and wear a mask when appropriate.',
  'Disinfect your device and any affected or nearby surfaces after recording your cough/speech.',
  'If you have an underlying condition that increases your risk from coughing, please check with your health care provider before participating.',
  'If you feel your symptoms are getting worse, please contact your local medical response',
];

const Step4 = (p: Wizard.StepProps) => {
  const { Portal } = usePortal({
    bindTo: document && document.getElementById('wizard-buttons') as HTMLDivElement,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeStep, setActiveStep] = useState(true);
  const {
    setDoGoBack, setTitle, title, setType, setLogoSize, setSubtitle,
  } = useHeaderContext();

  const history = useHistory();
  const { t } = useTranslation();

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
    setType('shapeDown');
    setLogoSize('regular');
    setSubtitle(t('beforeStart:title'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const adviseList: string[] = t('beforeStart:advise_list', { returnObjects: true, defaultValue: defaultAdviseList });

  return (
    <WelcomeStyledFormAlternative>
      <ShapeDownContainer>
        <WelcomeBorderContainer>
          <WelcomeSubtitle
            fontColor={colors.mineShaft}
            mb={15}
            mt={20}
            textAlign="left"
            isBold
          >
            <strong>{t('beforeStart:subtitle')}</strong>
          </WelcomeSubtitle>
        </WelcomeBorderContainer>
      </ShapeDownContainer>
      <WelcomeContent mt={10} mb={95}>
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
