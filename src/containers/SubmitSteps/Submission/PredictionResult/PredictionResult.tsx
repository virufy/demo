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
  IntroText,
} from './style';

const predictionEndpointUrl = process.env.REACT_APP_PREDICTION_ENDPOINT;

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
          // hospitalCode = 'virufy',
          // patientId = 'virufy',
        } = state.welcome;

        const body = new FormData();

        // Welcome Screens
        if (language) {
          body.append('language', language);
        }
        // if (hospitalCode) {
        body.append('hospitalCode', 'virufy');
        // }
        // if (patientId) {
        body.append('patientId', 'virufy');
        // }

        const response = await axiosClient.post('saveDemoSurvey', body, {
          headers: {
            'Content-Type': 'multipart/form-data; boundary=SaveDemoSurvey',
          },
        });

        // Restart
        actions.resetStore({});

        if (response.data) {
          console.log(response.data);
          const { submissionId, coughPath } = response.data;
          let prediction = 'XX';
          if (predictionEndpointUrl && submissionId && coughPath) {
            const predictionBody = new FormData();
            predictionBody.append('id', response.data.submissionId);
            predictionBody.append('coughPath', response.data.coughPath);
            console.log(response.data);
            const predictionResult = await axios.post(process.env.REACT_APP_PREDICTION_ENDPOINT
             || '', predictionBody, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            if (predictionResult.data && predictionResult.data.prediction) {
              prediction = (parseFloat(predictionResult.data.prediction) * 100).toFixed(2);
            }
          }

          setProcessing(false);
          setLikelihood(prediction);
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
                <strong>Important note:</strong> This app is only for demonstration purposes and does not provide a
                prediction. Please visit <Link to="https://virufy.org/study" target="_blank">Virufy Study</Link> to
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
