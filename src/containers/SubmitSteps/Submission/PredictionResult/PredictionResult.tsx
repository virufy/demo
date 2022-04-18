import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
// import axios from 'axios';

// Form
import { useStateMachine } from 'little-state-machine';

// Hooks
import { useModal } from 'hooks/useModals';

// Components
// import Link from 'components/Link';

// Modals
import ConfirmationModal from 'modals/ConfirmationModal';

// Update Action
import { resetStore } from 'utils/wizard';

// Header Control
import useHeaderContext from 'hooks/useHeaderContext';

// Utils
import { scrollToTop } from 'helper/scrollHelper';

// Styles
import {
  Title,
  ImageProcessing,
  ProcessingContainer,
  PredictionResultContainer,
  TitleResult,
  ImagePredictionResult,
  // VLogo,
  // LikelihoodText,
  // LikelihoodPercentageText,
  // SubmitError,
  IntroText,
  VLogo,
  // IntroText,
} from './style';

// const predictionEndpointUrl = process.env.REACT_APP_PREDICTION_ENDPOINT || '';

const PredictionResult = () => {
  // Hooks
  const {
    setDoGoBack, setTitle, setSubtitle, setType,
  } = useHeaderContext();
  const { t } = useTranslation();
  const { actions } = useStateMachine({ resetStore: resetStore() });

  // States
  // const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [processing, setProcessing] = React.useState<boolean>(true);
  // const [likelihood, setLikelihood] = React.useState<number>(-1);
  const { isOpen, openModal, closeModal } = useModal();

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
  /* const handleSubmit = async () => {
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

        // Restart
        actions.resetStore({});

        const predictionResult = await axios.post(predictionEndpointUrl, body, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (predictionResult.data && ('prediction' in predictionResult.data)) {
          setProcessing(false);
          const result = predictionResult.data.prediction;
          let resultPercentage = -1;
          try {
            resultPercentage = parseFloat(result.match(/\D*(?<percentage>[\d.]+)/)?.groups?.percentage);
            if (Number.isNaN(resultPercentage)) {
              resultPercentage = -1;
            }
          } catch {
            resultPercentage = -1;
          }
          setLikelihood(resultPercentage);
          // setLikelihood(t('predictionResult:result', { context: result, defaultValue: result }));
        } else {
          setProcessing(false);
          setLikelihood(-1);
        }
      } else {
        handleStartAgain();
      }
    } catch (error) {
      console.log('Error', error);
      setSubmitError(t('predictionResult:submitError'));
    }
  }; */

  // Effects
  React.useEffect(() => {
    scrollToTop();
    setTitle('');
    setDoGoBack(() => {});
    const timer1 = setTimeout(() => { setProcessing(false); actions.resetStore({}); }, 5000);
    return () => {
      clearTimeout(timer1);
    };
    // handleSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (processing) {
      setSubtitle('');
      setType('noShape');
    } else {
      setSubtitle(`${t('predictionResult:result')}`);
      setType('shapeUp');
      openModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [processing]);

  // Always positive result hardcoded
  const likelihood = -1;

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
            <ConfirmationModal
              isOpen={isOpen}
              modalTitle={t('predictionResult:note')}
              toggle={closeModal}
              onConfirm={closeModal}
            >
              <Trans i18nKey="predictionResult:resultModal">
                This app will not predict your COVID-19 status or diagnose any disease, disorder,
                or other health condition. Virufy is conducting research and will use the information
                you provide for that research only. Virufy will not take place of a doctor and would like to
                remind you it is your responsiblity to seek medical advice from your doctor.
              </Trans>
            </ConfirmationModal>
            <PredictionResultContainer>
              {/* Title, text and image conditional based on range result */}
              {(likelihood !== -1 && likelihood < 40) && (
                <>
                  <TitleResult color="#3DA63B">{t('predictionResult:resultNotDetected')}</TitleResult>
                  <IntroText>
                    <Trans i18nKey="predictionResult:resultNotDetectedText">
                      Your voice does not seem to have indicators of COVID-19. Please
                      <strong>continue to take appropriate measures</strong> based on the advice of
                      your healthcare professional or applicable regulatory body and reassess yourself in our app daily.
                    </Trans>
                  </IntroText>
                  <VLogo />
                </>
              )}
              {((likelihood >= 40 && likelihood < 70) || likelihood === -1) && (
              <>
                <TitleResult color="#C0B81E">{t('predictionResult:resultNotAnalyze')}</TitleResult>
                <IntroText>
                  <Trans i18nKey="predictionResult:resultNotAnalyzeText">
                    Our algorithm is not able to determine your COVID-19 status. Please
                    <strong>continue to take appropriate measures</strong> based on the advice of your healthcare
                    professional or applicable regulatory body and reassess yourself in our app daily.
                  </Trans>
                </IntroText>
                <ImagePredictionResult />
              </>
              )}
              {likelihood >= 70 && (
              <>
                <TitleResult color="#F15B5B">{t('predictionResult:resultDetected')}</TitleResult>
                <IntroText>
                  <Trans i18nKey="predictionResult:resultDetectedText">
                    Your voice has indicators of COVID-19. Please contact your
                    healthcare professional and take additional precautions.
                  </Trans>
                </IntroText>
                <ImagePredictionResult />
              </>
              )}
            </PredictionResultContainer>
          </>
        )
      }

      {/* Bottom Buttons }
      {
        submitError && (
          <SubmitError>
            {submitError}
          </SubmitError>
        )
      */}
    </>
  );
};

export default React.memo(PredictionResult);
