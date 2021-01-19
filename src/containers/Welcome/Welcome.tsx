import React from 'react';
import { createStore } from 'little-state-machine';

// Wizard
import { useRouteMatch, useLocation } from 'react-router-dom';
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

const steps: Wizard.Step[] = [
  {
    path: '',
    componentPath: 'Welcome/Step1',
    props: {
      storeKey: StoreKey,
      nextStep: `${baseUrl}/step-2`,
    },
  },
  {
    path: '/step-2',
    componentPath: 'Welcome/Step2',
    props: {
      storeKey: StoreKey,
      previousStep: `${baseUrl}`,
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
      steps={steps}
    >
      <DotIndicators
        current={active}
        total={steps.length}
      />
    </Wizard>
  );
};

export default React.memo(Welcome);
