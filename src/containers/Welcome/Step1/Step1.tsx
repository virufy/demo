import React from 'react';
import { useHistory } from 'react-router-dom';
import usePortal from 'react-useportal';
import { Trans, useTranslation } from 'react-i18next';

// Form
import { useForm, Controller } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

// Components
import WizardButtons from 'components/WizardButtons';
import Dropdown from 'components/Dropdown';
import CreatedBy from 'components/CreatedBy';

// Update Action
import { updateAction } from 'utils/wizard';

// Header Control
import useHeaderContext from 'hooks/useHeaderContext';

// Data
import { languageData } from 'data/lang';
import { countryData, countriesWithStates } from 'data/country';

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
  WelcomeLogoText,
  WelcomeRequiredFieldText,
  RegionContainer,
  WelcomeNote,
  WelcomeInput,
} from '../style';

const schema = Yup.object().shape({
  language: Yup.string().required(),
  accessCode: Yup.string(),
  // hospitalCode: Yup.string().required(),
  // patientId: Yup.string().oneOf(['virufy']).required(),
  country: Yup.string().required(),
  region: Yup.string().when('country', {
    is: (val: string) => countriesWithStates.includes(val),
    then: Yup.string().required(),
    otherwise: Yup.string(),
  }),
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
    setValue,
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

  const resetRegion = () => {
    setValue('region', '', {
      shouldValidate: true,
    });
  };

  // Effects
  React.useEffect(() => {
    scrollToTop();

    // Hide back arrow in header if neccesary
    if (doGoBack) setDoGoBack(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lang = watch('language');
  const country = watch('country');

  React.useEffect(() => {
    i18n.changeLanguage(lang);
  }, [i18n, lang]);

  // Memos
  const isDesktop = React.useMemo(() => width && width > 560, [width]);

  const countrySelectOptions = React.useMemo(() => [{ name: t('main:selectCountry'), consentFormUrl: '', val: '' },
    ...countryData], [t]);

  const regionSelectOptions = React.useMemo(() => {
    const output = [
      { name: t('main:selectRegion'), val: '' },
    ];
    if (country) {
      const elem = countryData.find(a => a.val === country);
      if (elem) {
        elem.states.forEach(s => {
          output.push({ name: s, val: s });
        });
      }
    }
    return output;
  }, [t, country]);

  if (!width) {
    return null;
  }

  return (
    <WelcomeStyledForm>
      {/* Logo */}
      <WelcomeLogo />
      <WelcomeLogoText>
        {t('main:logoIntro', 'An Independent Nonprofit Research Organization')}
      </WelcomeLogoText>

      {/* Title */}
      <WelcomeTitle
        fontSize={isDesktop ? 32 : 24}
        mt={32}
      >
        {t('main:title')}
      </WelcomeTitle>

      {/* Content */}
      <WelcomeContent>

        {/* Content: Subtitle */}
        <WelcomeSubtitle
          fontWeight={700}
          mb={0}
          mt={width && width > 560 ? 0 : 10}
          textAlign={width && width > 560 ? 'center' : 'left'}
        >
          {t('main:paragraph1')}
        </WelcomeSubtitle>

        <WelcomeSubtitle
          mt={width && width > 560 ? 50 : 32}
          mb={width && width > 560 ? 50 : 16}
          fontWeight={400}
          textAlign={width && width > 560 ? 'center' : 'left'}
        >
          {t('main:selectYourLanguage', 'Please select your language.')}
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

        <WelcomeSubtitle
          mt={width && width > 560 ? 50 : 32}
          mb={width && width > 560 ? 50 : 16}
          fontWeight={400}
          textAlign={width && width > 560 ? 'center' : 'left'}
        >
          {t('main:paragraph2')}
          <WelcomeRequiredFieldText> *</WelcomeRequiredFieldText>
        </WelcomeSubtitle>

        <Controller
          control={control}
          name="country"
          defaultValue={countrySelectOptions[0].val}
          render={({ onChange, value }) => (
            <Dropdown onChange={e => { onChange(e.currentTarget.value); resetRegion(); }} value={value}>
              {countrySelectOptions.map(({ name, val }) => <option key={name} id={name} value={val}>{name}</option>)}
            </Dropdown>
          )}
        />

        <Controller
          control={control}
          name="region"
          defaultValue={regionSelectOptions[0].val}
          render={({ onChange, value }) => (regionSelectOptions.length > 1 ? (
            <RegionContainer>
              <Dropdown onChange={e => onChange(e.currentTarget.value)} value={value}>
                {regionSelectOptions.map(({ name, val }) => <option key={name} id={name} value={val}>{name}</option>)}
              </Dropdown>
            </RegionContainer>
          ) : <></>)}
        />

        <WelcomeSubtitle
          mt={width && width > 560 ? 50 : 32}
          mb={width && width > 560 ? 50 : 16}
          fontWeight={400}
          textAlign={width && width > 560 ? 'center' : 'left'}
        >
          {t('main:provideAccessCode', 'If provided, please enter your access code.')}
        </WelcomeSubtitle>

        {/* Language */}
        <Controller
          control={control}
          name="accessCode"
          render={({ onChange, value, name }) => (
            <WelcomeInput
              name={name}
              value={value}
              onChange={onChange}
              type="text"
              placeholder={t('main:enterAccessCode', 'Enter your access code')}
              autoComplete="Off"
            />
          )}
        />

        <WelcomeNote>
          <Trans i18nKey="main:note">
            <strong>Please note:</strong> This form is for data collection only. It will not predict your COVID-19
            status or diagnose any disease, disorder, or other health condition. Virufy is conducting research and
            will use the information you provide for that research only. Virufy will not take place of a doctor and
            would like to remind you it is your responsibility to seek medical advice from your doctor.
          </Trans>
        </WelcomeNote>

        {/* Wizard Buttons */}
        {
          activeStep && (
            <Portal>
              <WizardButtons
                leftLabel={t('main:nextButton')}
                leftHandler={handleSubmit(onSubmit)}
                leftDisabled={!isValid}
                invert
              />

              <CreatedBy inline />
            </Portal>
          )
        }
      </WelcomeContent>
    </WelcomeStyledForm>
  );
};

export default React.memo(Step1);
