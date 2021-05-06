import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';

// Form
import { SubmitSteps, useStateMachine } from 'little-state-machine';

// Header Control
import useHeaderContext from 'hooks/useHeaderContext';

// Hooks
import useWindowSize from 'hooks/useWindowSize';

// Utils
import { scrollToTop } from 'helper/scrollHelper';
import { updateAction } from 'utils/wizard';

// Images
import Record, { RecordType } from './Record';

// Styles
import {
  MainContainer,
  InstructionsHeaderContainer,
  InstructionSubtitle,
  SocialDistancing,
  CoughLeft,
  InstructionTitle,
  InstructionBullets,
  BulletIndicator,
  InstructionContainer,
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
  const { setDoGoBack, setTitle, setType } = useHeaderContext();
  const history = useHistory();
  const { t } = useTranslation();
  const { width } = useWindowSize();
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
    setType('secondary');
  }, [setTitle, handleDoBack, setDoGoBack, t, setType]);

  return (
    <>
      <MainContainer>
        <InstructionsHeaderContainer>
          <InstructionTitle>{t('recordingsIntroduction:recordCough.title')}</InstructionTitle>
        </InstructionsHeaderContainer>
        <InstructionContainer mt={40} mb={30}>
          <InstructionBullets>
            <BulletIndicator>1</BulletIndicator>
          </InstructionBullets>
          <InstructionSubtitle mt={width && width > 560 ? 0 : 0} textAlign="left">
            {t('recordingsIntroduction:recordCough.intro1')}
          </InstructionSubtitle>
        </InstructionContainer>
        <SocialDistancing />
        <InstructionContainer mt={40} mb={40}>
          <InstructionBullets>
            <BulletIndicator>2</BulletIndicator>
          </InstructionBullets>
          <InstructionSubtitle mt={width && width > 560 ? 0 : 0} textAlign="left">
            {t('recordingsIntroduction:recordCough.intro2')}
          </InstructionSubtitle>
        </InstructionContainer>
        <CoughLeft />
        <InstructionContainer mt={40} mb={0}>
          <InstructionBullets>
            <BulletIndicator>3</BulletIndicator>
          </InstructionBullets>
          <InstructionSubtitle mt={width && width > 560 ? 0 : 0} textAlign="left" isBold>
            <Trans i18nKey="recordingsIntroduction:recordCough.text">
              Click the record button below and
              <strong>cough intentionally three times with a deep breath between each cough.</strong>
              When you are done, tap the stop button.
            </Trans>
          </InstructionSubtitle>
        </InstructionContainer>
        <Record
          defaultValues={getDefaultValue(state?.[storeKey], metadata?.currentLogic)}
          onManualUpload={handleManualUpload}
          onNext={handleNext}
          currentLogic={metadata?.currentLogic || ''}
          action={actions.updateAction}
        />
        <InstructionContainer mt={40} mb={40}>
          <InstructionBullets>
            <BulletIndicator>4</BulletIndicator>
          </InstructionBullets>
          <InstructionSubtitle mt={width && width > 560 ? 0 : 0} textAlign="left">
            <Trans i18nKey="recordingsRecord:textCount">
              Click the record button below and cough intentionally three times with a deep breath between
              each cough. When you are done, tap the stop button.
            </Trans>
          </InstructionSubtitle>
        </InstructionContainer>
      </MainContainer>
    </>
  );
};

export default React.memo(Introduction);
