import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Form
import { useForm, Controller } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

// Components
import Dropdown from 'components/Dropdown';
import CreatedBy from 'components/CreatedBy';

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
  WelcomeContent,
  WelcomeSubtitleBold,
  WelcomeStyledForm,
  ContainerNextButton,
  NextButton,
  ArrowRightSVG,
} from '../style';

const schema = Yup.object().shape({
  language: Yup.string().required(),
}).defined();

type Step1Type = Yup.InferType<typeof schema>;

const Step1 = (p: Wizard.StepProps) => {
  const {
    doGoBack, setDoGoBack, setLogoSize, setType,
  } = useHeaderContext();
  // Hooks
  const history = useHistory();
  const { width } = useWindowSize();
  const { t, i18n } = useTranslation();

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
    // setValue,
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

  React.useEffect(() => {
    scrollToTop();
    // Hide back arrow in header if neccesary
    if (doGoBack) setDoGoBack(null);

    setType('noShape');
    setLogoSize('big');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lang = watch('language');
  // const country = watch('country');

  React.useEffect(() => {
    i18n.changeLanguage(lang);
  }, [i18n, lang]);

  if (!width) {
    return null;
  }

  return (
    <WelcomeStyledForm>
      {/* Content */}
      <WelcomeContent mt={53}>
        <WelcomeSubtitleBold
          mt={width && width > 560 ? 50 : 40}
          mb={16}
          textAlign="left"
          isBold
        >
          <strong>{t('main:selectYourLanguage', 'Language')}</strong>
        </WelcomeSubtitleBold>

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

        {
          activeStep && (
            <>
              <ContainerNextButton>
                <NextButton
                  onClick={handleSubmit(onSubmit)}
                  isDisable={!isValid}
                >
                  <ArrowRightSVG />
                </NextButton>
              </ContainerNextButton>
              <CreatedBy inline />
            </>
          )
        }
      </WelcomeContent>
    </WelcomeStyledForm>
  );
};

export default React.memo(Step1);
