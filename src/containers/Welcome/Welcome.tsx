import React from 'react';
import { createStore } from 'little-state-machine';
import { useLocation, useRouteMatch } from 'react-router-dom';

// Wizard
import Wizard from 'components/Wizard';
import DotIndicators from 'components/DotIndicators';

const StoreKey = 'welcome';

createStore({
  [StoreKey]: {},
}, {
  name: 'VirufyWizard',
  middleWares: [],
  storageType: window.localStorage,
});

const baseUrl = '/welcome';

const stepsWithoutDots: Wizard.Step[] = [
  {
    path: '/',
    componentPath: 'Welcome/Step2',
    props: {
      storeKey: StoreKey,
      previousStep: `${baseUrl}`,
      nextStep: '/submit-steps/step-record/cough',
    },
  },
];
// No intermediate pages: Step2 goes directly into the submit-record flow
const steps: Wizard.Step[] = [];

const Welcome = () => {
  // Hooks
  const location = useLocation();
  const match = useRouteMatch();

  const combined = [...stepsWithoutDots, ...steps];
  const url = location.pathname.replace(match.url, '');
  const active = combined.findIndex(step => step.path === url);

  return (
    <Wizard
      steps={combined}
    >
      {active >= 0 && (
        <DotIndicators
          current={active}
          total={combined.length}
        />
      )}
    </Wizard>
  );
};

export default React.memo(Welcome);
