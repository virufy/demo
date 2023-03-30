import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import usePortal from 'react-useportal';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

// Form
import { useStateMachine } from 'little-state-machine';

// Update Action
import { resetStore } from 'utils/wizard';

// Header Control
import useHeaderContext from 'hooks/useHeaderContext';

// Utils
import { scrollToTop } from 'helper/scrollHelper';

// Styles
import WizardButtons from 'components/WizardButtons';
import {
  Title,
  ImageProcessing,
  ProcessingContainer,
  PredictionResultContainer,
  TitleResult,
  ImagePredictionResult,
  IntroText,
  StyledLow,
  StyledHigh,
  SubmitError,
} from './style';

const predictionEndpointUrl = process.env.REACT_APP_PREDICTION_ENDPOINT || '';

const PredictionResult = () => {
  // Hooks
  const {
    setDoGoBack, setTitle, setSubtitle, setType,
  } = useHeaderContext();
  const { t } = useTranslation();
  const { actions, state } = useStateMachine({ resetStore: resetStore() });
  const { Portal } = usePortal({
    bindTo: document && document.getElementById('wizard-buttons') as HTMLDivElement,
  });
  const history = useHistory();

  // States
  const [errorCode, setErrorCode] = React.useState<string | null>(null);
  const [accessCode, setAccessCode] = React.useState<string | null>(null);
  const [processing, setProcessing] = React.useState<boolean>(true);
  const [prediction, setPrediction] = React.useState<string>('unknown');
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Hide the Footer Report Problems while processing
    const target = document && document.getElementById('footer-report-problems');
    if (target) {
      if (processing) {
        target.style.display = 'none';
      } else {
        target.style.display = 'flex';
      }
    }
  }, [processing]);

  // Handlers
  const handleSubmit = async () => {
    try {
      setSubmitError(null);
      if (state && state.welcome && state['submit-steps']) {
        const {
          recordYourCough,
        } = state['submit-steps'];

        const body = new FormData();

        // Records
        const coughFile = recordYourCough?.recordingFile || recordYourCough?.uploadedFile;
        if (coughFile) {
          body.append('cough', coughFile, coughFile.name || 'filename.wav');
        }

        body.append('accessCode', state.welcome?.accessCode ?? '');

        const predictionResult = await axios.post(predictionEndpointUrl, body, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (predictionResult.data) {
          setProcessing(false);
          setPrediction(predictionResult.data.prediction);
          setErrorCode(predictionResult.data.errorCode);
          actions.resetStore({});
        }
      } else {
        actions.resetStore({});
      }
    } catch (err) {
      console.log('Error', err);
      setSubmitError(t('predictionResult:submitError'));
    }
  };

  const handleReturnMain = React.useCallback(() => {
    history.replace('/welcome');
  }, [history]);

  // Effects
  React.useEffect(() => {
    setAccessCode(state.welcome?.accessCode ?? '');
    scrollToTop();
    setTitle('');
    setDoGoBack(() => {});
    setType('noShape');
    handleSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (processing) {
      setSubtitle('');
    } else {
      setSubtitle(`${t('predictionResult:result')}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [processing]);

  // Always positive result hardcoded

  console.log('errorCode', errorCode);

  return (
    <>
      {
        processing ? (
          <ProcessingContainer>
            {/* Title */}
            <Title>
              {t('predictionResult:processingTitle')}
            </Title>

            {/* Image */}
            <ImageProcessing />
          </ProcessingContainer>
        ) : (
          <>
            {
            (!accessCode || errorCode)
              ? (
                <PredictionResultContainer>
                  <Title>
                    {t('predictionResult:result')}
                  </Title>
                  <TitleResult color="#FF4444">
                    <Trans i18nKey="predictionResult:resultDetectedDummy" />
                  </TitleResult>
                  <StyledHigh />
                  <IntroText>
                    <Trans i18nKey="predictionResult:resultDetectedText">
                      {/* eslint-disable-next-line max-len */}
                      Your voice has indicators of COVID-19. Please contact your
                      healthcare professional and take additional precautions.
                    </Trans>
                  </IntroText>
                  <ImagePredictionResult />
                </PredictionResultContainer>
              ) : (
                <>
                  <PredictionResultContainer>
                    <Title>
                      {t('predictionResult:result')}
                    </Title>
                    {/* Title, text and image conditional based on range result */}
                    {prediction === 'positive' && (
                      <>
                        <TitleResult color="#4FDB76">{t('predictionResult:resultNotDetected')}</TitleResult>
                        <StyledLow />
                        <IntroText>
                          <Trans i18nKey="predictionResult:resultNotDetectedText">
                            {/* eslint-disable-next-line max-len */}
                            Your voice does not seem to have indicators of COVID-19. Please <strong>continue to take appropriate measures</strong> based on the advice of your healthcare professional or applicable regulatory body and reassess yourself in our app daily.
                          </Trans>
                        </IntroText>
                      </>
                    )}
                    {prediction === 'unknown' && (
                      <>
                        <TitleResult>{t('predictionResult:resultNotAnalyze')}</TitleResult>
                        <IntroText>
                          <Trans i18nKey="predictionResult:resultNotAnalyzeText">
                            Our algorithm is not able to determine your COVID-19 status.
                            <strong>Please submit another cough</strong>.
                          </Trans>
                        </IntroText>
                      </>
                    )}
                    {prediction === 'negative' && (
                      <>
                        <StyledHigh />
                        <TitleResult color="#FF4444">{t('predictionResult:resultDetected')}</TitleResult>
                        <IntroText>
                          <Trans i18nKey="predictionResult:resultDetectedText">
                            Your voice has indicators of COVID-19. Please contact your
                            healthcare professional and take additional precautions.
                          </Trans>
                        </IntroText>
                      </>
                    )}
                  </PredictionResultContainer>
                </>
              )
          }
          </>
        )
      }

      {/* Bottom Buttons */}
      <Portal>
        {
          !processing && (
            <>
              <IntroText>
                {
                  accessCode
                    ? (
                      <Trans i18nKey="predictionResult:resultModal">
                        {/* eslint-disable-next-line max-len */}
                        <strong>Aviso importante:</strong> Esta aplicación no predecirá su estado de COVID-19 ni diagnosticará ninguna enfermedad, trastorno u otra condición de salud. Virufy está llevando a cabo una investigación y utilizará la información que proporciones únicamente para dicha investigación. Virufy no sustituirá a un médico y le recuerda que es su responsabilidad buscar consejo médico de su médico.
                      </Trans>
                    ) : (
                      <Trans i18nKey="predictionResult:resultModalDummy">
                        {/* eslint-disable-next-line max-len */}
                        <strong>Aviso importante:</strong> Esta aplicación no predecirá su estado de COVID-19 ni diagnosticará ninguna enfermedad, trastorno u otra condición de salud. Virufy está llevando a cabo una investigación y utilizará la información que proporciones únicamente para dicha investigación. Virufy no sustituirá a un médico y le recuerda que es su responsabilidad buscar consejo médico de su médico.
                      </Trans>
                    )
                }
              </IntroText>
              <WizardButtons
                invert
                leftLabel={t('predictionResult:nextButton')}
                leftHandler={handleReturnMain}
              />
            </>
          )
        }
        {submitError && (
        <SubmitError>
          {`${t('predictionResult:error')} ${submitError}`}
        </SubmitError>
        )}
      </Portal>
    </>
  );
};

export default React.memo(PredictionResult);
