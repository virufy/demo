import React from 'react';
import { useHistory } from 'react-router-dom';
import usePortal from 'react-useportal';
import { useTranslation } from 'react-i18next';

// Form
import { useStateMachine } from 'little-state-machine';

// Components
import WizardButtons from 'components/WizardButtons';

// Hooks
import useAxios from 'hooks/useAxios';

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
  LikelihoodText,
  LikelihoodPercentageText,
  SubmitError,
} from './style';

const PredictionResult = () => {
  // Hooks
  const { Portal } = usePortal({
    bindTo: document && document.getElementById('wizard-buttons') as HTMLDivElement,
  });
  const { setDoGoBack, setTitle } = useHeaderContext();
  const history = useHistory();
  const { t } = useTranslation();
  const { state, actions } = useStateMachine({ resetStore: resetStore() });
  const axiosClient = useAxios();

  // States
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [processing, setProcessing] = React.useState<boolean>(true);
  const [likelihood, setLikelihood] = React.useState<string>();

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

  // Effects
  React.useEffect(() => {
    scrollToTop();
    setTitle('');
    setDoGoBack(() => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handlers
  const handleStartAgain = React.useCallback(() => {
    history.replace('');
  }, [history]);

  const handleSubmit = async () => {
    try {
      setSubmitError(null);
      if (state && state.welcome && state['submit-steps']) {
        const {
          language,
          hospitalCode,
          patientId,
        } = state.welcome;

        const {
          recordYourCough,
          recordYourSpeech,
        } = state['submit-steps'];

        const body = new FormData();

        // Welcome Screens
        if (language) {
          body.append('language', language);
        }
        if (hospitalCode) {
          body.append('hospitalCode', hospitalCode);
        }
        if (patientId) {
          body.append('patientId', patientId);
        }

        // Records
        if (recordYourCough.recordingFile || recordYourCough.uploadedFile) {
          body.append('cough', recordYourCough.recordingFile || recordYourCough.uploadedFile);
        }
        if (recordYourSpeech.recordingFile || recordYourSpeech.uploadedFile) {
          body.append('voice', recordYourSpeech.recordingFile || recordYourSpeech.uploadedFile);
        }

        // TODO: Use new endpoint
        if (process.env.NODE_ENV === 'development') {
          // Restart
          actions.resetStore({});

          setProcessing(false);

          setLikelihood(`${Math.round(Math.random() * 100)}`);
        } else {
          const response = await axiosClient.post('saveSurvey', body, {
            headers: {
              'Content-Type': 'multipart/form-data; boundary=SaveSurvey',
            },
          });

          // Restart
          actions.resetStore({});

          if (response.data) {
            setProcessing(false);
            // setLikelihood(`${Math.round(Math.random() * 100)}`);
          }
        }
      } else {
        // TODO: remove else, just for testing
        setProcessing(false);
      }
    } catch (error) {
      console.log('Error', error);
      setSubmitError(t('beforeSubmit:submitError'));
    }
  };

  React.useEffect(() => {
    // TODO: Update this
    setTimeout(() => {
      handleSubmit();
    }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <PredictionResultContainer>
            {/* Title */}
            <TitleResult>
              {t('predictionResult:predictionResultTitle')}
            </TitleResult>

            {/* Likelihood */}
            {
              likelihood && (
                <LikelihoodText>
                  {t('predictionResult:likelihoodPrefix')}
                  <LikelihoodPercentageText>
                    {' '}
                    {likelihood}%
                  </LikelihoodPercentageText>
                </LikelihoodText>
              )
            }

            {/* Image */}
            <ImagePredictionResult />
          </PredictionResultContainer>
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
