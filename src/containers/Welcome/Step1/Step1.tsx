import React from 'react';
import { useHistory } from 'react-router-dom';
import usePortal from 'react-useportal';
import { useTranslation } from 'react-i18next';

// Form
import { useForm, Controller } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

// Components
import WizardButtons from 'components/WizardButtons';
import Dropdown from 'components/Dropdown';

// Update Action
import { updateAction } from 'utils/wizard';

// Header Control
import useHeaderContext from 'hooks/useHeaderContext';

// Data
import { languageData } from 'data/lang';

// Hooks
import useWindowSize from 'hooks/useWindowSize';

// Utils
import { scrollToTop } from 'helper/scrollHelper';

// Styles
import {
  WelcomeLogo,
  WelcomeTitle,
  WelcomeContent,
  WelcomeSubtitle,
  WelcomeStyledForm,
  // WelcomeInput,
  // WelcomeRequiredFieldText,
} from '../style';

const schema = Yup.object().shape({
  language: Yup.string().required(),
  // hospitalCode: Yup.string().required(),
  // patientId: Yup.string().oneOf(['virufy']).required(),
}).defined();

type Step1Type = Yup.InferType<typeof schema>;

const Step1 = (p: Wizard.StepProps) => {
  // Hooks
  const history = useHistory();
  const { width } = useWindowSize();
  const { t, i18n } = useTranslation();

  const { Portal } = usePortal({
    bindTo: document && document.getElementById('wizard-buttons') as HTMLDivElement,
  });
  const { doGoBack, setDoGoBack } = useHeaderContext();

  // States
  const [activeStep, setActiveStep] = React.useState(true);
  const {
    state,
    actions,
  } = useStateMachine({ updateAction: updateAction(p.storeKey) });

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

  // Effects
  React.useEffect(() => {
    // NOTE: repopulate default values
    if (state && state[p.storeKey]) {
      reset(state[p.storeKey]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handlers
  const onSubmit = async (values: Step1Type) => {
    if (values) {
      actions.updateAction(values);
      if (p.nextStep) {
        setActiveStep(false);
        history.push(p.nextStep);
      }
    }
  };

  // Effects
  React.useEffect(() => {
    scrollToTop();

    // Hide back arrow in header if neccesary
    if (doGoBack) setDoGoBack(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lang = watch('language');

  React.useEffect(() => {
    i18n.changeLanguage(lang);
  }, [i18n, lang]);

  // Memos
  const isDesktop = React.useMemo(() => width && width > 560, [width]);

  if (!width) {
    return null;
  }

  return (
    <WelcomeStyledForm>
      {/* Logo */}
      <WelcomeLogo />

      {/* Title */}
      <WelcomeTitle
        fontSize={isDesktop ? 42 : 34}
      >
        {t('main:title')}
      </WelcomeTitle>

      {/* Content */}
      <WelcomeContent>

        {/* Content: Subtitle */}
        <WelcomeSubtitle
          fontWeight={400}
          mb={isDesktop ? 50 : 30}
          mt={width && width > 560 ? 0 : -14}
        >
          {t('main:paragraph1')}
        </WelcomeSubtitle>

        {/* Language */}
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

        {/* Hospital Code */}
        {/* <WelcomeSubtitle
          mt={isDesktop ? 50 : 35}
          mb={isDesktop ? 20 : 17}
          fontSize={16}
          fontWeight={700}
          textAlign="left"
        >
          {t('main:hospitalCodeLabel')}
          <WelcomeRequiredFieldText>*</WelcomeRequiredFieldText>
        </WelcomeSubtitle>

        <Controller
          control={control}
          name="hospitalCode"
          defaultValue=""
          render={({ onChange, value }) => (
            <WelcomeInput
              value={value}
              onChange={onChange}
              type="text"
              id="hospitalCode"
              placeholder={t('main:hospitalCodePlaceholder')}
              autoComplete="Off"
            />
          )}
        /> */}

        {/* Patient ID */}
        {/* <WelcomeSubtitle
          mt={isDesktop ? 50 : 17}
          mb={isDesktop ? 20 : 17}
          fontSize={16}
          fontWeight={700}
          textAlign="left"
        >
          {t('main:patientIdLabel')}
          <WelcomeRequiredFieldText>*</WelcomeRequiredFieldText>
        </WelcomeSubtitle>
        <Controller
          control={control}
          name="patientId"
          defaultValue=""
          render={({ onChange, value }) => (
            <WelcomeInput
              value={value}
              onChange={onChange}
              type="text"
              id="patientId"
              placeholder={t('main:patientIdPlaceholder')}
              autoComplete="Off"
            />
          )}
        /> */}

        {/* Wizard Buttons */}
        {
          activeStep && (
            <Portal>
              <WizardButtons
                leftLabel={t('main:nextButton')}
                leftHandler={handleSubmit(onSubmit)}
                leftDisabled={!isValid}
              />
            </Portal>
          )
        }
      </WelcomeContent>
    </WelcomeStyledForm>
  );
};

export default React.memo(Step1);
