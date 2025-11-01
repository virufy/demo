import React, { useEffect, useCallback, useState } from 'react';
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
import SetResult from 'components/SetResult';

// Update Action
import { updateAction } from 'utils/wizard';

// Theme

// Assets
import HeaderSplash from 'assets/images/headerSplash.png';

// Utils
import { scrollToTop } from 'helper/scrollHelper';

// Data
import { languageData } from 'data/lang';

// Styles
import Link from 'components/Link';
import {
  WelcomeContent,
  WelcomeStyledFormAlternative,
  HeaderImageContainer,
  HeaderImage,
  LogoWhiteBG,
  BoldBlackText,
  WelcomeNote,
  BoldBlackTextPrivacy,
} from '../style';

const schema = Yup.object().shape({
  language: Yup.string().required(),
}).defined();

type Step2Type = Yup.InferType<typeof schema>;

const Step2 = (p: Wizard.StepProps) => {
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
  } = useHeaderContext();

  // Hook Form
  const {
    control,
    formState,
    handleSubmit,
    watch,
    reset,
    // setValue,
  } = useForm({
    defaultValues: state?.[p.storeKey],
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const { isValid } = formState;
  const { t, i18n } = useTranslation();

  React.useEffect(() => {
    // NOTE: repopulate default values
    if (state && state[p.storeKey]) {
      reset(state[p.storeKey]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeStep, setActiveStep] = useState(true);

  const history = useHistory();

  const doBack = useCallback(() => {
    if (p.previousStep) {
      setActiveStep(false);
      history.push(p.previousStep);
    } else {
      history.goBack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (values: Step2Type) => {
    if (values) {
      actions.updateAction(values);
      if (p.nextStep) {
        setActiveStep(false);
        history.push(p.nextStep);
      }
    }
  };

  useEffect(() => {
    scrollToTop();
    setDoGoBack(() => doBack);
    setType('nothing');
    setTitle('');
  }, [doBack, setDoGoBack, setTitle, setType]);

  const lang = watch('language');

  React.useEffect(() => {
    i18n.changeLanguage(lang);
  }, [i18n, lang]);

  return (
    <WelcomeStyledFormAlternative>
      <HeaderImageContainer>
        <HeaderImage
          src={HeaderSplash}
        />
        <LogoWhiteBG />
      </HeaderImageContainer>

      {/* Language */}
      <BoldBlackText>
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
          >
            {
              languageData.map(({ code, label }) => (
                <option
                  key={code}
                  id={code}
                  value={code}
                >
                  {label}
                </option>
              ))
            }
          </Dropdown>
        )}
      />

      <WelcomeContent>
        <WelcomeNote>
          <Trans i18nKey="main:virufyInfo">
            Virufy is a robust <strong>501(c)(3) nonprofit</strong> company with <strong>250 volunteers/staff</strong> and <strong>50 partner organizations</strong> including Amazon Web Services, Stanford COVID-19 Response Innovation Lab, and One Young World. We've developed a smartphone app which leverages AI to analyze the signature of recorded coughs to determine disease risk status (<strong>e.g. TB, COPD, COVID-19, flu</strong>). Virufy is supported by faculty and alumni from Stanford, MIT, and Harvard.
            <br /><br />
            By collecting <strong>coughs recordings</strong> from people around the world, Virufy is improving the robustness of its AI algorithm in recognizing unique disease sound patterns.
            <br /><br />
            <strong>Please note:</strong> This form is for data collection only. It will not predict your COVID-19 status or diagnose any disease, disorder, or other health condition. Virufy is conducting research and will use the information you provide for that research only. Virufy will not take place of a doctor and would like to remind you it is your responsibility to seek medical advice from your doctor.
          </Trans>
        </WelcomeNote>

        <BoldBlackTextPrivacy>
          <Link to="https://virufy.org/privacy_policy/" target="_blank">
            <Trans i18nKey="main:privacyPolicy">
              By proceeding you accept the terms of our Privacy Policy
            </Trans>
          </Link>
        </BoldBlackTextPrivacy>

               {activeStep && (
          <Portal>
            <WizardButtons
              invert
              leftLabel={t('helpVirufy:nextButton')}
              leftHandler={handleSubmit(onSubmit)}
              leftDisabled={!isValid}
            />
          </Portal>
        )}
      </WelcomeContent>

      <div style={{ marginBottom: '50px' }}>
        <SetResult />
      </div>
    </WelcomeStyledFormAlternative>
  );
};

export default React.memo(Step2);
