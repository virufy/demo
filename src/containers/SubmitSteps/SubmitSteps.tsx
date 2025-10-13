import React from 'react';
import { createStore, useStateMachine } from 'little-state-machine';
import { useHistory } from 'react-router-dom';
import Wizard from 'components/Wizard';

// Wizard
const StoreKey = 'submit-steps';

createStore({
  [StoreKey]: {
    recordYourCough: {
      recordingFile: undefined,
      uploadedFile: undefined,
    },
  },
}, {
  name: 'VirufyWizard',
  middleWares: [],
  storageType: window.localStorage,
});

const baseUrl = '/submit-steps';
const baseComponentPath = 'SubmitSteps';
const middleComponentPathRecording = 'RecordingsSteps';
const middleComponentPathSubmission = 'Submission';
const recordYourCoughLogic = 'recordYourCough';

const steps: Wizard.Step[] = [
  // Record Your Cough Steps
  {
    path: '/step-record/cough',
    componentPath: `${baseComponentPath}/${middleComponentPathRecording}/Introduction`,
    props: {
      storeKey: StoreKey,
      previousStep: '/welcome/step-2',
      nextStep: `${baseUrl}/step-listen/cough`,
      metadata: {
        currentLogic: recordYourCoughLogic,
      },
    },
  },
  {
    path: '/step-listen/cough',
    componentPath: `${baseComponentPath}/${middleComponentPathRecording}/ListenAudio`,
    props: {
      storeKey: StoreKey,
      previousStep: `${baseUrl}/step-record/cough`,
      nextStep: `${baseUrl}/prediction-result`,
      metadata: {
        currentLogic: recordYourCoughLogic,
      },
    },
  },
  // Submission
  {
    path: '/prediction-result',
    componentPath: `${baseComponentPath}/${middleComponentPathSubmission}/PredictionResult`,
    props: {
      storeKey: StoreKey,
      previousStep: `${baseUrl}/step-record/cough`,
      nextStep: '',
    },
  },
];

const SubmitSteps = () => {
  // Hooks
  const { state } = useStateMachine();
  const history = useHistory();

  // Effects
  React.useEffect(() => {
    const checkFileProblem = (file: File) => {
      if (file && file.size === undefined) {
        return true;
      }
      return false;
    };

    const checkFileConsistencyProblem = (inputState: Record<string, any>) => {
      let out = null;

      if (inputState[StoreKey]) {
        const { recordYourCough } = inputState[StoreKey];
        const toTest = [];

        if (recordYourCough) {
          const { recordingFile } = recordYourCough;
          if (recordingFile) {
            toTest.push({ file: recordingFile, route: '/step-record/cough' });
          }
        }

        const itemWithProblem = toTest.find(toTestItem => checkFileProblem(toTestItem.file));
        if (itemWithProblem) {
          out = itemWithProblem.route;
        }
      }

      return out;
    };

    const problemRoute = checkFileConsistencyProblem(state);
    if (problemRoute) {
      history.push(`/${StoreKey}${problemRoute}`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

const WrapperSubmitSteps = () => (
  <Wizard
    steps={steps}
  >
    <SubmitSteps />
  </Wizard>
);

export default React.memo(WrapperSubmitSteps);
