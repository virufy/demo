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
    componentPath: 'Welcome/CombinedSplashScreen', // NEW: Use your combined component
    props: {
      storeKey: StoreKey,
      nextStep: '/submit-steps/step-record/cough', // Skip directly to recording
    },
  },
];

// Optional: Keep this if you want a second step, or remove it entirely
const steps: Wizard.Step[] = [
  // Remove or comment out the old step-3 since everything is now combined
  // {
  //   path: '/step-3',
  //   componentPath: 'Welcome/Step3',
  //   props: {
  //     storeKey: StoreKey,
  //     previousStep: `${baseUrl}/step-2`,
  //     nextStep: '/submit-steps/step-record/cough',
  //   },
  // },
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
      {/* Remove dots since we only have one step now */}
      {active >= 0 && steps.length > 1 && (
        <DotIndicators
          current={active}
          total={steps.length}
        />
      )}
    </Wizard>
  );
};

export default React.memo(Welcome);