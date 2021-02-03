import React from 'react';
import loadable from '@loadable/component';
import { Switch, Route, Redirect } from 'react-router-dom';

// Components
import FullWidth from 'components/FullWidthDiv';
import Header, { HeaderContextProvider } from 'components/Header';
import FooterReportProblems from 'components/FooterReportProblems';

// hooks
import { useInitializeGoogleAnalytics } from 'hooks/useInitializeGoogleAnalytics';

// Styles
import { AppContainer } from './style';

const AsyncLoad = loadable(({ container }: { container: string }) => import(`containers/${container}`), {
  fallback: <div>Loading ...</div>,
  cacheKey: ({ container }: { container: string }) => container,
});

const App = () => {
  // Google Analytics
  useInitializeGoogleAnalytics();

  return (
    <AppContainer>
      <HeaderContextProvider>
        <Header />
        <FullWidth style={{ flex: 1 }}>
          <Switch>
            <Route path="/welcome">
              <AsyncLoad key="Welcome" container="Welcome" />
            </Route>
            <Route path="/submit-steps">
              <AsyncLoad key="SubmitSteps" container="SubmitSteps" />
            </Route>
            <Redirect exact from="/" to="/welcome" />
            <Route>
              <div>404 Page</div>
            </Route>
          </Switch>
        </FullWidth>
        <FooterReportProblems />
      </HeaderContextProvider>
    </AppContainer>
  );
};

export default App;
