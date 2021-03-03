import React from 'react';
import usePortal from 'react-useportal';
import { useTranslation, Trans } from 'react-i18next';

// Form
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

// Components
import MicRecorder from 'components/MicRecorder';
import WizardButtons from 'components/WizardButtons';

// Images
import UploadSVG from 'assets/icons/upload.svg';

// Styles
import {
  MainContainer,
  UploadContainer,
  UploadImage,
  UploadText,
  Text,
  MicContainer,
} from './style';

const audioMaxSizeInMb = 5;

const schema = Yup.object({
  recordingFile: Yup.mixed()
    .required('ERROR.FILE_REQUIRED')
    .test('fileSize', 'ERROR.FILE_SIZE', (value?: any) => {
      if (value) {
        const file = value as File;
        const { size } = file;
        return (size <= 1024 ** 3 * audioMaxSizeInMb);
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

export type RecordType = Yup.InferType<typeof schema>;

interface RecordProps {
  onNext: (values: RecordType) => void,
  onManualUpload: () => void,
  defaultValues: RecordType,
  currentLogic: string,
  action:any,
}

const Record = ({
  onNext,
  onManualUpload,
  defaultValues,
  currentLogic,
  action,
}: RecordProps) => {
  // Hooks
  const { Portal } = usePortal({
    bindTo:
      document && (document.getElementById('wizard-buttons') as HTMLDivElement),
  });
  const {
    handleSubmit, control, getValues, formState,
  } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { t } = useTranslation();

  const { isValid } = formState;

  // Refs
  const micKey = React.useRef<number>(1);

  const onManualUploadWithFile = () => {
    action({
      [currentLogic]: {
        recordingFile: getValues('recordingFile') || null,
        uploadedFile: null,
      },
    });
    onManualUpload?.();
  };

  return (
    <>
      <MainContainer>
        <Text>
          <Trans i18nKey="recordingsRecord:text">
            Click the record button and cough intentionally 3 to 5 times <strong>during 3 seconds minimum</strong>.
            When you are done, click Continue
          </Trans>
        </Text>
        <MicContainer>
          <Controller
            control={control}
            name="recordingFile"
            render={({ onChange }) => (
              <MicRecorder
                key={micKey.current} // On delete, easy re-mount a new mic recorder
                onNewRecord={onChange}
                recordingFile={defaultValues?.recordingFile}
              />
            )}
          />
        </MicContainer>

        <Portal>
          <WizardButtons
            invert
            leftLabel={t('recordingsRecord:next')}
            leftDisabled={!isValid}
            leftHandler={handleSubmit(onNext)}
          />
          {/* Upload Container */}
          <UploadContainer onClick={onManualUploadWithFile}>
            <UploadImage src={UploadSVG} />
            <UploadText>{t('recordingsRecord:upload')}</UploadText>
          </UploadContainer>
        </Portal>
      </MainContainer>
    </>
  );
};

export default React.memo(Record);
