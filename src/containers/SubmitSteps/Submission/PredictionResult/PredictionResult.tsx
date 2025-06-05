import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import usePortal from 'react-useportal';
import { useHistory } from 'react-router-dom';
import { useStateMachine } from 'little-state-machine'; // ADD THIS IMPORT

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

const PredictionResult = () => {
  // Hooks
  const {
    setDoGoBack, setTitle, setSubtitle, setType,
  } = useHeaderContext();
  const { t } = useTranslation();
  const { Portal } = usePortal({
    bindTo: document && document.getElementById('wizard-buttons') as HTMLDivElement,
  });
  const history = useHistory();
  
  // ADD THIS: Get user's selection from splash screen
  const { state } = useStateMachine();
  const userSelection = state?.welcome?.result; // 'positive' or 'negative'

  // States
  const errorCode = null;
  const [processing, setProcessing] = React.useState<boolean>(true);
  const [prediction, setPrediction] = React.useState<string>('unknown');
  const submitError = null;

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
    // CHANGE THIS: Use user's selection instead of localStorage
    const predictionResult = userSelection || 'negative'; // Use splash screen selection
    setPrediction(predictionResult);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setProcessing(false);
  };

  const handleReturnMain = React.useCallback(() => {
    history.replace('/welcome');
  }, [history]);

  // Effects
  React.useEffect(() => {
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

  console.log('User selected on splash screen:', userSelection);
  console.log('Final prediction result:', prediction);

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
            (errorCode === 'invalid_access_code')
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
                    {prediction === 'negative' && (
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
                    {prediction === 'positive' && (
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
                <Trans i18nKey="predictionResult:resultModalDummy">
                  {/* eslint-disable-next-line max-len */}
                  <strong>Aviso importante:</strong> Esta aplicación no predecirá su estado de COVID-19 ni diagnosticará ninguna enfermedad, trastorno u otra condición de salud. Virufy está llevando a cabo una investigación y utilizará la información que proporciones únicamente para dicha investigación. Virufy no sustituirá a un médico y le recuerda que es su responsabilidad buscar consejo médico de su médico.
                </Trans>
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
          {`${submitError}`}
        </SubmitError>
        )}
      </Portal>
    </>
  );
};

export default React.memo(PredictionResult);