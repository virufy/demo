import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Form
import { SubmitSteps, useStateMachine } from 'little-state-machine';

// Header Control
import useHeaderContext from 'hooks/useHeaderContext';

// Utils
import { scrollToTop } from 'helper/scrollHelper';
import { updateAction } from 'utils/wizard';

// Images
import CoughLeftPNG from 'assets/images/cough-left.png';
import SocialDistancingPNG from 'assets/images/social-distancing.png';
import PhoneMicPNG from 'assets/images/phone-mic.png';
import Record, { RecordType } from './Record';

// Styles
import {
  MainContainer,
  Text,
  TopImage,
  BottomImagesContainer,
  BottomImageLeft,
  BottomImageRight,
  InstructionTitle,
} from './style';

function getDefaultValue(state?: SubmitSteps, currentLogic?: 'recordYourCough'): RecordType {
  if (state && currentLogic && state[currentLogic]?.recordingFile?.size !== undefined) {
    return state[currentLogic] as RecordType;
  }

  return {
    recordingFile: null,
  };
}

const Introduction = ({
  previousStep,
  nextStep,
  otherSteps,
  metadata,
  storeKey,
}: Wizard.StepProps) => {
  const { state, actions } = useStateMachine({ updateAction: updateAction(storeKey) });

  // Hooks
  const { setDoGoBack, setTitle } = useHeaderContext();
  const history = useHistory();
  const { t } = useTranslation();

  // Handlers
  const handleDoBack = React.useCallback(() => {
    if (previousStep) {
      history.push(previousStep);
    } else {
      history.goBack();
    }
  }, [history, previousStep]);

  const handleManualUpload = React.useCallback(() => {
    if (otherSteps && otherSteps.manualUploadStep) {
      history.push(otherSteps.manualUploadStep);
    }
  }, [otherSteps, history]);

  const handleNext = React.useCallback(
    values => {
      if (nextStep) {
        actions.updateAction({
          [metadata?.currentLogic]: {
            recordingFile: values.recordingFile,
            uploadedFile: null,
          },
        });
        history.push(nextStep, { from: 'step-record' });
      }
    },
    [nextStep, actions, metadata, history],
  );

  // Effects
  useEffect(() => {
    scrollToTop();
    setTitle(t('recordingsIntroduction:recordCough.header'));
    setDoGoBack(() => handleDoBack);
  }, [setTitle, handleDoBack, setDoGoBack, t]);

  return (
    <>
      <MainContainer>
        <InstructionTitle>{t('recordingsIntroduction:recordCough.title')}</InstructionTitle>
        <Text>
          {t('recordingsIntroduction:recordCough.intro1')}
        </Text>
        <TopImage
          src={SocialDistancingPNG}
        />
        <Text>
          {t('recordingsIntroduction:recordCough.intro2')}
        </Text>
        <BottomImagesContainer>
          <BottomImageLeft
            src={PhoneMicPNG}
          />
          <BottomImageRight
            src={CoughLeftPNG}
          />
        </BottomImagesContainer>
      </MainContainer>

      <Record
        defaultValues={getDefaultValue(state?.[storeKey], metadata?.currentLogic)}
        onManualUpload={handleManualUpload}
        onNext={handleNext}
        currentLogic={metadata?.currentLogic || ''}
        action={actions.updateAction}
      />
    </>
  );
};

export default React.memo(Introduction);
