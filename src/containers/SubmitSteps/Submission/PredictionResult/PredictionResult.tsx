import React from 'react';
import { useHistory } from 'react-router-dom';
import usePortal from 'react-useportal';
import { useTranslation, Trans } from 'react-i18next';
import axios from 'axios';

// Form
import { useStateMachine } from 'little-state-machine';

// Components
import WizardButtons from 'components/WizardButtons';
import Link from 'components/Link';

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
  IntroText,
} from './style';

const predictionEndpointUrl = process.env.REACT_APP_PREDICTION_ENDPOINT || '';

const PredictionResult = () => {
  // Hooks
  const { Portal } = usePortal({
    bindTo: document && document.getElementById('wizard-buttons') as HTMLDivElement,
  });
  const { setDoGoBack, setTitle } = useHeaderContext();
  const history = useHistory();
  const { t } = useTranslation();
  const { state, actions } = useStateMachine({ resetStore: resetStore() });

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
        if (recordYourCough?.recordingFile || recordYourCough?.uploadedFile) {
          body.append('cough', recordYourCough.recordingFile! || recordYourCough.uploadedFile!);
        }

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
          console.log('Prediction: ', predictionResult.data.prediction, ' - ', typeof predictionResult.data.prediction);
          console.log('Result: ', result);
          setLikelihood(`${result}`);
          // setLikelihood(t('predictionResult:result', { context: result, defaultValue: result }));
        } else {
          setProcessing(false);
          setLikelihood('-');
        }
      } else {
        handleStartAgain();
      }
    } catch (error) {
      console.log('Error', error);
      setSubmitError(t('beforeSubmit:submitError'));
    }
  };

  // Effects
  React.useEffect(() => {
    scrollToTop();
    setTitle('');
    setDoGoBack(() => {});
    handleSubmit();
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

            <IntroText>
              <Trans i18nKey="main:introductionText">
                <strong>Important note:</strong> this app is only for demonstration purposes and does not provide a
                prediction. Please visit <Link to="https://virufy.org/app" target="_blank">virufy.org/app</Link> to
                contribute your cough and help us to complete this app.
              </Trans>
            </IntroText>

            {/* Likelihood */}
            {
              likelihood && (
                <LikelihoodText>
                  {t('predictionResult:likelihoodPrefix')}
                  <LikelihoodPercentageText>
                    {' '}
                    {likelihood}
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
