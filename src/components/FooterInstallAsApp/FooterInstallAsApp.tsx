import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

// Components
import Link from 'components/Link';

// Data
import { reportProblemForm } from 'data/reportProblemForm';

const FooterInstallAsApp = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const lang = i18n.language;

  if (location.pathname !== '/welcome/step-2') return null;

  return (
    <div
      id="footer-report-problems"
    >
      {
        lang && (
          <Link to={reportProblemForm[lang as FeedbackLanguage]} target="_blank">
            { t('footerReportProblems:message')}
          </Link>
        )
      }
    </div>
  );
};

export default React.memo(FooterInstallAsApp);
