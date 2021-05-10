import React from 'react';
import { useHistory } from 'react-router-dom';
import usePortal from 'react-useportal';
import { useTranslation } from 'react-i18next';
// import { useTranslation, Trans } from 'react-i18next';
import axios from 'axios';

// Form
import { useStateMachine } from 'little-state-machine';

// Hooks
import { useModal } from 'hooks/useModals';

// Components
import WizardButtons from 'components/WizardButtons';
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
  VLogo,
  // LikelihoodText,
  // LikelihoodPercentageText,
  SubmitError,
  IntroText,
  // IntroText,
} from './style';

const predictionEndpointUrl = process.env.REACT_APP_PREDICTION_ENDPOINT || '';

const PredictionResult = () => {
  // Hooks
  const { Portal } = usePortal({
    bindTo: document && document.getElementById('wizard-buttons') as HTMLDivElement,
  });
  const {
    setDoGoBack, setTitle, setSubtitle, setType,
  } = useHeaderContext();
  const history = useHistory();
  const { t } = useTranslation();
  const { state/* , actions */ } = useStateMachine({ resetStore: resetStore() });

  // States
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [processing, setProcessing] = React.useState<boolean>(true);
  const [likelihood, setLikelihood] = React.useState<string>();
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
  const handleStartAgain = React.useCallback(() => {
    history.replace('');
  }, [history]);

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

        // Restart
        // actions.resetStore({});

        const predictionResult = await axios.post(predictionEndpointUrl, body, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (predictionResult.data && ('prediction' in predictionResult.data)) {
          setProcessing(false);
          const result = predictionResult.data.prediction;
          result.match(/\D*(?<percentage>[\d.]+)/);
          setLikelihood(`${result}`);
          console.log(likelihood);
          // setLikelihood(t('predictionResult:result', { context: result, defaultValue: result }));
        } else {
          setProcessing(false);
          setLikelihood('XX');
        }
      } else {
        handleStartAgain();
      }
    } catch (error) {
      console.log('Error', error);
      setSubmitError(t('predictionResult:submitError'));
    }
  };

  // Effects
  React.useEffect(() => {
    scrollToTop();
    setTitle('');
    if (processing) {
      setSubtitle('');
      setType('noShape');
    } else {
      setSubtitle('Results');
      setType('shapeUp');
      openModal();
    }
    setDoGoBack(() => {});
    handleSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [processing]);

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
              modalTitle="Important Note: "
              toggle={closeModal}
              onConfirm={closeModal}
            >
              prueba
            </ConfirmationModal>
            <PredictionResultContainer>
              {/* Title, text and image conditional based on range result */}
              {(likelihood !== undefined && likelihood <= '40') && (
                <>
                  <TitleResult color="#3DA63B">COVID-19: NOT DETECTED</TitleResult>
                  <IntroText>
                    Our algorithm is not able to determine your COVID-19 status.
                    Please <strong>continue to take appropriate measures</strong> based on the advice of your
                    healthcare professional or applicable regulatory body and reassess yourself in our app daily.
                  </IntroText>
                  <VLogo />
                </>
              )}
              {(((likelihood !== undefined) && (likelihood > '40' && likelihood < '70')) || (likelihood === undefined)) && (
              <>
                <TitleResult color="#C0B81E">Unable to analyze</TitleResult>
                <IntroText>
                  Our algorithm is not able to determine your COVID-19 status.
                  Please <strong>continue to take appropriate measures</strong> based on the advice of your
                  healthcare professional or applicable regulatory body and reassess yourself in our app daily.
                </IntroText>
                <ImagePredictionResult />
              </>
              )}
              {(likelihood !== undefined && likelihood >= '70)') && (
              <>
                <TitleResult color="#F15B5B">COVID-19: DETECTED</TitleResult>
                <IntroText>
                  Our algorithm is not able to determine your COVID-19 status.
                  Please <strong>continue to take appropriate measures</strong> based on the advice of your
                  healthcare professional or applicable regulatory body and reassess yourself in our app daily.
                </IntroText>
                <ImagePredictionResult />
              </>
              )}
            </PredictionResultContainer>
          </>
        )
      }

      {/* Bottom Buttons */}
      {
        submitError && (
          <SubmitError>
            {submitError}
          </SubmitError>
        )
      }
      {
        !processing && (
          <Portal>
            <WizardButtons
              invert
              leftLabel={t('predictionResult:nextButton')}
              leftHandler={handleStartAgain}
              leftDisabled={false}
            />
          </Portal>
        )
      }
    </>
  );
};

export default React.memo(PredictionResult);
