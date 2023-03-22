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
      nextStep: `${baseUrl}/step-3`,
    },
  },
];

const steps: Wizard.Step[] = [
  {
    path: '/step-3',
    componentPath: 'Welcome/Step3',
    props: {
      storeKey: StoreKey,
      previousStep: `${baseUrl}/step-2`,
      nextStep: '/submit-steps/step-record/cough',
    },
  },
];

const Welcome = () => {
  // Hooks
  const location = useLocation();
  const match = useRouteMatch();

  const url = location.pathname.replace(match.url, '');
  const active = steps.findIndex(step => step.path === url);

  return (
    <Wizard
      steps={[...stepsWithoutDots, ...steps]}
    >
      {active >= 0 && (
        <DotIndicators
          current={active}
          total={steps.length}
        />
      )}
    </Wizard>
  );
};

export default React.memo(Welcome);
