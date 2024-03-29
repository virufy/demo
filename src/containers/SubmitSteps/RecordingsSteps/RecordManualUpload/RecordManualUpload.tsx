import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import usePortal from 'react-useportal';
import { useTranslation } from 'react-i18next';

// Form
import { Controller, useForm } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

// Components
import WizardButtons from 'components/WizardButtons';

// Header Control
import useHeaderContext from 'hooks/useHeaderContext';

// Utils
import { updateAction } from 'utils/wizard';
import { scrollToTop } from 'helper/scrollHelper';

// Styles
import {
  MainContainer,
  Title,
  TextErrorContainer,
  UploadContainer,
  UploadInput,
  UploadButton,
  CloudsSVG,
  ArrowUp,
} from './style';

const audioMaxSizeInMb = 5;

const mimeTypes = 'audio/wav,audio/wave,audio/wav,audio/x-wav,audio/x-pn-wav,audio/mp3,audio/ogg';

const schema = Yup.object({
  uploadedFile: Yup.mixed()
    .required('ERROR.FILE_REQUIRED')
    .test('fileSize', 'ERROR.FILE_SIZE', (value?: any) => {
      if (value) {
        const file = value as File;
        const { size } = file;
        return size <= ((1024 ** 3) * audioMaxSizeInMb);
      }
      return !!value;
    })
    .test('fileDuration', 'ERROR.FILE_DURATION', async (value?: any) => {
      if (value) {
        const file = value as File;
        const audio = new Audio(URL.createObjectURL(file));

        audio.load();
        await new Promise(resolver => audio.addEventListener('loadedmetadata', resolver));
        return (audio.duration >= 3);
      }
      return !!value;
    }),
}).defined();

const RecordManualUpload = ({
  storeKey,
  previousStep,
  nextStep,
  metadata,
}: Wizard.StepProps) => {
  // Hooks
  const { Portal } = usePortal({
    bindTo: document && document.getElementById('wizard-buttons') as HTMLDivElement,
  });
  const {
    setDoGoBack, setTitle, setSubtitle, setType,
  } = useHeaderContext();
  const history = useHistory();
  const { state, actions } = useStateMachine({ updateAction: updateAction(storeKey) });
  const {
    control,
  } = useForm({
    mode: 'onChange',
    defaultValues: state?.[storeKey]?.[metadata?.currentLogic],
    resolver: yupResolver(schema),
  });
  const { t } = useTranslation();

  // States
  const [activeStep, setActiveStep] = React.useState(true);
  const [errorMsg, setErrorMsg] = React.useState('');
  const inputUpload = useRef<HTMLInputElement>(null);

  // Handlers
  const handleNext = React.useCallback((values: File) => {
    if (nextStep) {
      actions.updateAction({
        [metadata?.currentLogic]: {
          recordingFile: null,
          uploadedFile: values,
        },
      });
      setActiveStep(false);
      history.push(nextStep, { from: 'step-manual-upload' });
    }
  }, [nextStep, actions, metadata, history]);

  const handleDoBack = React.useCallback(() => {
    setActiveStep(false);
    if (previousStep) {
      history.push(previousStep);
    } else {
      history.goBack();
    }
  }, [history, previousStep]);

  const handleUpload = React.useCallback(e => {
    schema.validate({ uploadedFile: e }).then(() => {
      handleNext(e);
    }).catch(err => {
      if (err.errors[0] === 'ERROR.FILE_SIZE') {
        setErrorMsg(t('recordingsRecordManual:fileSizeTooBig'));
      } if (err.errors[0] === 'ERROR.FILE_REQUIRED') {
        setErrorMsg(t('recordingsRecordManual:fileRequired'));
      } else {
        setErrorMsg(t('recordingsRecordManual:fileDurationTooShort'));
      }
    });
  }, [handleNext, t]);

  // Effects
  useEffect(() => {
    scrollToTop();
    setTitle(t('recordingsRecordManual:header'));
    setSubtitle('');
    setType('shapeUp');
    setDoGoBack(() => handleDoBack);
  }, [handleDoBack, setDoGoBack, setType, setSubtitle, setTitle, t]);

  return (
    <>
      <MainContainer>
        <Title>
          {t('recordingsRecordManual:micError')}
        </Title>
        <CloudsSVG />
        <Controller
          control={control}
          name="uploadedFile"
          render={({ name }) => (
            <UploadContainer>
              <UploadButton htmlFor="uploaded-file" />
              <ArrowUp />
              <UploadInput
                ref={inputUpload}
                id="uploaded-file"
                type="file"
                name={name}
                accept={mimeTypes}
                onChange={e => handleUpload(e.currentTarget.files?.[0])}
              />
            </UploadContainer>
          )}
        />
      </MainContainer>
      <TextErrorContainer>
        {errorMsg}
      </TextErrorContainer>
      {/* Bottom Buttons */}
      {activeStep && (
        <Portal>
          <WizardButtons
            invert
            leftLabel={t('recordingsRecordManual:uploadFile')}
            leftHandler={() => inputUpload.current?.click()}
          />
        </Portal>
      )}
    </>
  );
};

export default React.memo(RecordManualUpload);
