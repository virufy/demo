import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import usePortal from 'react-useportal';

// Form
import { useForm, Controller } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

// Header Control
import useHeaderContext from 'hooks/useHeaderContext';

// Components
import WizardButtons from 'components/WizardButtons';
import Dropdown from 'components/Dropdown';
import Link from 'components/Link';
import LinkPurple from 'components/LinkPurple';

// Update Action
import { updateAction } from 'utils/wizard';

// Assets
import HeaderSplash from 'assets/images/headerSplash.png';

// Data
import { languageData } from 'data/lang';

// Utils
import { scrollToTop } from 'helper/scrollHelper';

// Theme
import { colors } from 'theme';

// Styles
import {
  WelcomeContent,
  WelcomeStyledFormAlternative,
  HeaderImageContainer,
  HeaderImage,
  LogoWhiteBG,
  BoldBlackText,
  WelcomeNote,
  BoldBlackTextPrivacy,
  WelcomeSubtitle,
} from '../style';

const schema = Yup.object().shape({
  language: Yup.string().required(),
  result: Yup.string().required(),
}).defined();

type CombinedStepType = Yup.InferType<typeof schema>;

const CombinedSplashScreen = (p: Wizard.StepProps) => {
  const { Portal } = usePortal({
    bindTo: document && document.getElementById('wizard-buttons') as HTMLDivElement,
  });

  const {
    state,
    actions,
  } = useStateMachine({ updateAction: updateAction(p.storeKey) });

  const {
    setDoGoBack,
    setType,
    setTitle,
    setLogoSize,
  } = useHeaderContext();

  // Hook Form
  const {
    control,
    formState,
    handleSubmit,
    watch,
    reset,
  } = useForm({
    defaultValues: state?.[p.storeKey],
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const { isValid } = formState;
  const { t, i18n } = useTranslation();

  const [activeStep, setActiveStep] = useState(true);
  const history = useHistory();

  React.useEffect(() => {
    // NOTE: repopulate default values
    if (state && state[p.storeKey]) {
      reset(state[p.storeKey]);
    }
  }, [state, p.storeKey, reset]);

  const onSubmit = async (values: CombinedStepType) => {
    if (values) {
      // Store the user's selection for later use
      actions.updateAction(values);
      setActiveStep(false);
      
      // Always go to recording first
      if (p.nextStep) {
        history.push(p.nextStep);
      }
    }
  };

  useEffect(() => {
    scrollToTop();
    setDoGoBack(null);
    setType('nothing');
    setTitle('');
    setLogoSize('regular');
  }, [setDoGoBack, setTitle, setType, setLogoSize]);

  const lang = watch('language');

  React.useEffect(() => {
    i18n.changeLanguage(lang);
  }, [i18n, lang]);

  return (
    <WelcomeStyledFormAlternative>
      {/* Header with splash image and logo */}
      <HeaderImageContainer>
        <HeaderImage src={HeaderSplash} />
        <LogoWhiteBG />
      </HeaderImageContainer>

      <WelcomeContent>
        {/* Language Selection */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <BoldBlackText style={{ marginBottom: '16px' }}>
            {t('main:selectYourLanguage', 'Language')}
          </BoldBlackText>

          <Controller
            control={control}
            name="language"
            defaultValue={i18n.language.split('-')[0] || languageData[0].code}
            render={({ onChange, value }) => (
              <Dropdown
                onChange={e => onChange(e.currentTarget.value)}
                value={value}
                style={{ 
                  width: '300px', 
                  maxWidth: '90%',
                  margin: '0 auto',
                  display: 'block'
                }}
              >
                {languageData.map(({ code, label }) => (
                  <option key={code} id={code} value={code}>
                    {label}
                  </option>
                ))}
              </Dropdown>
            )}
          />
        </div>

        {/* About Virufy Section - Combined from Step 2 and Step 3 */}
        <WelcomeSubtitle 
          mt={0} 
          mb={24} 
          textAlign="left" 
          fontColor={colors.mineShaft} 
          isBold
        >
          <Trans i18nKey="helpVirufy:aboutParagraph">
            <p>
              <strong>Virufy</strong> is a robust <strong>501(c)(3) nonprofit</strong> company with{' '}
              <strong>250 volunteers/staff</strong> and <strong>50 partner organizations</strong>{' '}
              including Amazon Web Services, Stanford COVID-19 Response Innovation Lab, and One Young World.
              We've developed a smartphone app which leverages <strong>AI to analyze the signature of recorded coughs</strong>{' '}
              to <strong>determine their similarity with COVID positive cough data</strong>.
              Virufy is supported by faculty and alumni from UW, Stanford, UC Berkeley, MIT, Harvard, and CMU.
            </p>
            <p>
              Our team includes researchers from over <strong>25 countries</strong>.{' '}
              <LinkPurple to={`https://virufy.org/${i18n.language || 'en'}/our-approach`} target="_blank">
                Our research
              </LinkPurple>{' '}
              has shown that AI technology may be able to identify COVID&apos;s unique cough signature.
            </p>
            <p>
              By collecting <strong>coughs recordings</strong> from people around the world, 
              Virufy is improving the robustness of its AI algorithm in recognizing COVID&apos;s unique sound pattern.
            </p>
            <p>
              <strong>You have the power</strong> to help benefit millions of
              people across the globe by <strong>contributing your cough</strong> in our study.
            </p>
          </Trans>
        </WelcomeSubtitle>

        {/* Important Notice */}
        <WelcomeNote style={{ marginBottom: '16px' }}>
          <Trans i18nKey="main:note">
            <strong>Please note:</strong> This form is for data collection only. It will not predict your COVID-19
            status or diagnose any disease, disorder, or other health condition. Virufy is conducting research and
            will use the information you provide for that research only. Virufy will not take place of a doctor and
            would like to remind you it is your responsibility to seek medical advice from your doctor.
          </Trans>
        </WelcomeNote>

        {/* Privacy Policy */}
        <BoldBlackTextPrivacy style={{ marginBottom: '32px', textAlign: 'center' }}>
          <Link to="https://virufy.org/privacy_policy/" target="_blank">
            <Trans i18nKey="main:privacyPolicy">
              By proceeding you accept the terms of our Privacy Policy
            </Trans>
          </Link>
        </BoldBlackTextPrivacy>

        {/* Result Selection - Conditional layout for RTL languages */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '32px',
          flexDirection: (lang === 'ur' || lang === 'ar') ? 'row-reverse' : 'row'
        }}>
          <span style={{ fontSize: '16px', fontWeight: 'normal' }}>
            {t('main:selectResult', 'Select Result :')}
          </span>
          <Controller
            control={control}
            name="result"
            defaultValue=""
            render={({ onChange, value }) => (
              <Dropdown
                onChange={e => onChange(e.currentTarget.value)}
                value={value}
                style={{ 
                  width: '150px',
                  minWidth: '120px'
                }}
              >
                <option value="" disabled>
                  {t('main:selectResult', 'Select result')}
                </option>
                <option value="positive">{t('main:positive', 'Positive')}</option>
                <option value="negative">{t('main:negative', 'Negative')}</option>
              </Dropdown>
            )}
          />
        </div>

        {/* Consent Button */}
        {activeStep && (
          <Portal>
            <WizardButtons
              invert
              leftLabel={t('main:consent', 'Consent')}
              leftHandler={handleSubmit(onSubmit)}
              leftDisabled={!isValid}
            />
          </Portal>
        )}
      </WelcomeContent>
    </WelcomeStyledFormAlternative>
  );
};

export default React.memo(CombinedSplashScreen);