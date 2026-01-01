
// Showing positive egardless of what user submits //

import React from 'react';
import { useTranslation } from 'react-i18next';
import usePortal from 'react-useportal';
// import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useTheme } from 'styled-components';
import type { ThemeType } from 'theme';

// Header Control
import useHeaderContext from 'hooks/useHeaderContext';

// Utils
import { scrollToTop } from 'helper/scrollHelper';

// Styles
import WizardButtons from 'components/WizardButtons';
import { DISEASES } from 'data/diseases';
import { getDiseaseIcon } from './diseaseIcons';
import virufyLogo from 'assets/virufyLogo.png';
import {
  Title,
  ImageProcessing,
  ProcessingContainer,
  PredictionResultContainer,
  IntroText,
  ResultCard,
  CardTitle,
  PercentageDisplay,
  CardBodyText,
  SectionTitle,
  DiseaseList,
  DiseaseRow,
  DiseaseRowHeader,
  BarTrack,
  BarFill,
  DividerLine,
  GaugeWrap,
  VirufyLogo,
  SubmitError,
} from './style';

type DemoResult = 'negative' | 'unknown' | 'positive';

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const getMainDiseasePercent = (result: DemoResult): number => {
  if (result === 'positive') return 85;
  if (result === 'negative') return 20;
  return 55;
};

type RiskKey = 'high' | 'unknown' | 'low';
const getRiskKey = (percent: number): RiskKey => {
  if (percent > 80) return 'high';
  if (percent < 30) return 'low';
  return 'unknown';
};

const polarToCartesian = (cx: number, cy: number, r: number, angleDeg: number) => {
  const angleRad = (Math.PI / 180) * angleDeg;
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  };
};

const arcPath = (cx: number, cy: number, r: number, startAngle: number, endAngle: number) => {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = Math.abs(endAngle - startAngle) <= 180 ? '0' : '1';
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
};

const PredictionResult = () => {
  // Hooks
  const {
    setDoGoBack, setTitle, setSubtitle, setType,
  } = useHeaderContext();
  const { t, i18n  } = useTranslation();
  const theme = useTheme() as ThemeType;
  const { Portal } = usePortal({
    bindTo: document && document.getElementById('wizard-buttons') as HTMLDivElement,
  });
  const history = useHistory();
  const isArabic = i18n.language === 'ar';

  // States
  const [processing, setProcessing] = React.useState<boolean>(true);
  const [prediction, setPrediction] = React.useState<DemoResult>('unknown');
  const getDiseaseTranslationKey = (diseaseId: string): string => {
    const keyMap: Record<string, string> = {
      'covid-19': 'diseaseCovid19',
      'rsv': 'diseaseRsv',
      'asthma': 'diseaseAsthma',
      'flu': 'diseaseFlu',
      'pediatric-asthma': 'diseasePediatricAsthma',
    };
    return keyMap[diseaseId] || diseaseId;
  };

  const getTranslatedDiseaseLabel = (id: string | null | undefined): string => {
    const normalized = id ?? 'covid-19';
    const disease = DISEASES.find((d) => d.id === normalized);
    return t(`setResult:${getDiseaseTranslationKey(normalized)}`, { defaultValue: disease?.label ?? 'COVID-19' });
  };

  const [diseaseLabel, setDiseaseLabel] = React.useState<string>(getTranslatedDiseaseLabel(null));
  const [selectedDiseaseId, setSelectedDiseaseId] = React.useState<string>('covid-19');
  const submitError = null;

  React.useEffect(() => {
    // Hide the Footer Report Problems while processing
    const target = document && document.getElementById('footer-report-problems');
    if (target) {
      if (processing) {
        target.style.display = 'none';
      } else {
        target.style.display = 'flex';
      }
    }
  }, [processing]);

  // Handlers
  const handleSubmit = async () => {
    const predictionResult = (localStorage.getItem('predictionResult') || 'negative') as DemoResult;
    const selectedDisease = localStorage.getItem('predictionDisease') || 'covid-19';
    setPrediction(predictionResult);
    setSelectedDiseaseId(selectedDisease);
    setDiseaseLabel(getTranslatedDiseaseLabel(selectedDisease));
    await new Promise(resolve => setTimeout(resolve, 2000));
    setProcessing(false);
  };

  const handleReturnMain = React.useCallback(() => {
    history.replace('/welcome');
  }, [history]);

  // Effects
  React.useEffect(() => {
    scrollToTop();
    setTitle('');
    setDoGoBack(() => {});
    setType('noShape');
    handleSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (processing) {
      setSubtitle('');
    } else {
      setSubtitle('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [processing]);

  const mainPercent = getMainDiseasePercent(prediction);
  const riskKey = getRiskKey(mainPercent);

  const diseaseIds: string[] = ['covid-19', 'asthma', 'rsv', 'flu'];
  if (selectedDiseaseId === 'pediatric-asthma') diseaseIds.push('pediatric-asthma');

  const otherPercents: Record<string, number> = {
    'covid-19': 50,
    asthma: 20,
    rsv: 60,
    flu: 40,
    'pediatric-asthma': 45,
  };

  const allDiseaseResults = diseaseIds
    .map((id) => {
      const percent = id === selectedDiseaseId ? mainPercent : clamp(otherPercents[id] ?? 40, 0, 80);
      const status: DemoResult = id === selectedDiseaseId
        ? prediction
        : (percent < 30 ? 'negative' : 'unknown');

      return {
        id,
        label: getTranslatedDiseaseLabel(id),
        percent,
        status,
      };
    })
    .sort((a, b) => b.percent - a.percent);

  const statusColor = (status: DemoResult) => {
    if (status === 'positive') return '#F44';
    if (status === 'negative') return '#A3A3A3';
    return '#FDFF8A';
  };

  const titleSuffix = prediction === 'positive'
    ? t('predictionResult:statusDetected')
    : prediction === 'negative'
      ? t('predictionResult:statusNotDetected')
      : t('predictionResult:statusInconclusive');

  const riskText = riskKey === 'high'
    ? t('predictionResult:riskHigh')
    : riskKey === 'low'
      ? t('predictionResult:riskLow')
      : t('predictionResult:riskUnknown');

  // Gauge setup
  const gaugePct = clamp(mainPercent, 0, 100);
  const needleAngle = -180 + (gaugePct / 100) * 180;
  const needlePos = polarToCartesian(100, 100, 70, needleAngle);

  const GAUGE_COLORS = {
    low: '#4FDB76',
    unknown: '#FDFF8A',
    high: '#F44',
  } as const;

  const GAUGE_OUTLINE = theme.colors.mineShaft;
  const outlineWidth = 20;
  const colorWidth = 16;
  const segmentGapDeg = 0;
  const dividerStrokeWidth = 2;
  const dividerInnerR = 70 - colorWidth / 2 - 1;
  const dividerOuterR = 70 + colorWidth / 2 + 1;
  const capInnerR = 70 - outlineWidth / 2;
  const capOuterR = 70 + outlineWidth / 2;

  return (
    <>
      {
        processing ? (
          <ProcessingContainer>
            <VirufyLogo src={virufyLogo} alt="Virufy" />
            {/* Title */}
            {/* The title here is "processingTitle" not "result" */}
            <Title>
              {t('predictionResult:processingTitle')}
            </Title>

            {/* Image */}
            <ImageProcessing />
          </ProcessingContainer>
        ) : (
          <PredictionResultContainer style={isArabic ? { textAlign: 'center' } : undefined}>
            <VirufyLogo src={virufyLogo} alt="Virufy" />
            <Title dir={isArabic ? 'rtl' : undefined}>
              {t('predictionResult:result')}
            </Title>

            <ResultCard>
              <CardTitle>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                  <span>
                    {t('predictionResult:cardTitle', { disease: diseaseLabel, status: titleSuffix })}
                  </span>
                </span>
              </CardTitle>

              <PercentageDisplay color={GAUGE_COLORS[riskKey]}>
                {mainPercent}%
              </PercentageDisplay>

              <GaugeWrap aria-label="risk-gauge">
                <svg width="320" height="170" viewBox="0 0 200 120" role="img">
                  {/* Single outline arc */}
                  <path
                    d={arcPath(100, 100, 70, -180, 0)}
                    stroke={GAUGE_OUTLINE}
                    strokeWidth={outlineWidth}
                    fill="none"
                    strokeLinecap="butt"
                  />

                  {/* Colored arcs */}
                  <path
                    d={arcPath(100, 100, 70, -180 + segmentGapDeg, -120 - segmentGapDeg)}
                    stroke={GAUGE_COLORS.low}
                    strokeWidth={colorWidth}
                    fill="none"
                    strokeLinecap="butt"
                  />
                  <path
                    d={arcPath(100, 100, 70, -120 + segmentGapDeg, -60 - segmentGapDeg)}
                    stroke={GAUGE_COLORS.unknown}
                    strokeWidth={colorWidth}
                    fill="none"
                    strokeLinecap="butt"
                  />
                  <path
                    d={arcPath(100, 100, 70, -60 + segmentGapDeg, 0 - segmentGapDeg)}
                    stroke={GAUGE_COLORS.high}
                    strokeWidth={colorWidth}
                    fill="none"
                    strokeLinecap="butt"
                  />

                  {/* Thin dividers between segments */}
                  {([-120, -60] as const).map((angle) => {
                    const inner = polarToCartesian(100, 100, dividerInnerR, angle);
                    const outer = polarToCartesian(100, 100, dividerOuterR, angle);
                    return (
                      <line
                        key={angle}
                        x1={inner.x}
                        y1={inner.y}
                        x2={outer.x}
                        y2={outer.y}
                        stroke={GAUGE_OUTLINE}
                        strokeWidth={dividerStrokeWidth}
                        strokeLinecap="butt"
                      />
                    );
                  })}

                  {/* End-cap outline lines */}
                  {([-180, 0] as const).map((angle) => {
                    const inner = polarToCartesian(100, 100, capInnerR, angle);
                    const outer = polarToCartesian(100, 100, capOuterR, angle);
                    return (
                      <line
                        key={`cap-${angle}`}
                        x1={inner.x}
                        y1={inner.y}
                        x2={outer.x}
                        y2={outer.y}
                        stroke={GAUGE_OUTLINE}
                        strokeWidth={dividerStrokeWidth}
                        strokeLinecap="butt"
                      />
                    );
                  })}

                  <circle cx={needlePos.x} cy={needlePos.y} r={7} fill={theme.colors.realWhite} stroke={GAUGE_OUTLINE} strokeWidth={3} />

                  {/* Risk text placed at base of arc */}
                  {(() => {
                    const lines = riskText.split('\n');
                    const fill = prediction === 'positive' ? '#F44' : theme.colors.mineShaft;
                    return (
                      <text
                        x={100}
                        y={80}
                        textAnchor="middle"
                        fontFamily="Open Sans"
                        fontWeight={400}
                        fontSize={20}
                        fill={fill}
                      >
                        <tspan x={100} dy={0}>{lines[0]}</tspan>
                        {lines[1] ? <tspan x={100} dy={22}>{lines[1]}</tspan> : null}
                      </text>
                    );
                  })()}
                </svg>
              </GaugeWrap>

              <CardBodyText>
                {t('predictionResult:analysisSummary', { percent: mainPercent, disease: diseaseLabel })}
              </CardBodyText>
            </ResultCard>

            <DividerLine />

            <SectionTitle>
              {t('predictionResult:screeningResultsTitle')}
            </SectionTitle>

            <DiseaseList>
              {allDiseaseResults.map((d) => (
                <DiseaseRow key={d.id}>
                  <DiseaseRowHeader>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                      {(() => {
                        const Icon = getDiseaseIcon(d.id);
                        return Icon ? <Icon width={20} height={20} aria-hidden focusable={false} /> : null;
                      })()}
                      <span>{d.label}</span>
                    </span>
                    <span>{d.percent}%</span>
                  </DiseaseRowHeader>
                  <BarTrack>
                    <BarFill widthPct={d.percent} color={statusColor(d.status)} />
                  </BarTrack>
                </DiseaseRow>
              ))}
            </DiseaseList>
          </PredictionResultContainer>
        )
      }
      {/* Bottom Buttons */}
      <Portal>
        {
          !processing && (
            <>
              <IntroText className="instruction" dir={i18n.language === 'ar' ? 'rtl' : undefined}>
                <strong>{t('predictionResult:note')}</strong>{' '}
                {t('predictionResult:disclaimerText', { disease: diseaseLabel })}
              </IntroText>
              <WizardButtons
                invert
                leftLabel={t('predictionResult:returnHome')}
                leftHandler={handleReturnMain}
              />
            </>
          )
        }
        {submitError && (
        <SubmitError>
          {`${submitError}`}
        </SubmitError>
        )}
      </Portal>
    </>
  );
};

export default React.memo(PredictionResult);