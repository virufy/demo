import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next"; // added
import { StyledSelector } from "./style";
import { DISEASES, DEFAULT_DISEASE_ID } from "data/diseases";

// result :string in ['low', 'medium', 'high']
// stored in localStorage (use PredictionResult.tsx)
const SetResult = () => {
  const { t, i18n } = useTranslation(); // added
  const [result, setResult] = useState<string>("negative");
  const [disease, setDisease] = useState<string>(DEFAULT_DISEASE_ID);

  useEffect(() => {
    const storedResult = localStorage.getItem("predictionResult");
    if (
      storedResult &&
      (storedResult === "negative" ||
        storedResult === "unknown" ||
        storedResult === "positive")
    ) {
      setResult(storedResult);
    }

    const storedDisease = localStorage.getItem("predictionDisease");
    if (storedDisease && DISEASES.some((d) => d.id === storedDisease)) {
      setDisease(storedDisease);
    } else {
      localStorage.setItem("predictionDisease", DEFAULT_DISEASE_ID);
    }
  }, []);

  const handleDiseaseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setDisease(selectedValue);
    localStorage.setItem("predictionDisease", selectedValue);
    console.log(`Selected disease: ${selectedValue}`);
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setResult(selectedValue);
    localStorage.setItem("predictionResult", selectedValue);
    console.log(`Selected result: ${selectedValue}`);
  };

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

  return (
    // set dir so browser aligns select and label for Arabic automatically
    <div className="set-result" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <div style={{ marginBottom: 8 }}>
        <label
          htmlFor="disease"
          style={{ marginRight: "8px", marginLeft: i18n.language === "ar" ? 0 : 8 }}
        >
          {t("setResult:selectDisease", { defaultValue: "Select Disease" })} :
        </label>
        <StyledSelector id="disease" value={disease} onChange={handleDiseaseChange}>
          {DISEASES.filter((d) => !d.group).map((d) => (
            <option key={d.id} value={d.id}>
              {t(`setResult:${getDiseaseTranslationKey(d.id)}`, { defaultValue: d.label })}
            </option>
          ))}
          {DISEASES.some((d) => d.group === 'Pediatric') && (
            <optgroup label={t('setResult:pediatricSection', { defaultValue: 'Pediatric' })}>
              {DISEASES.filter((d) => d.group === 'Pediatric').map((d) => (
                <option key={d.id} value={d.id}>
                  {t(`setResult:${getDiseaseTranslationKey(d.id)}`, { defaultValue: d.label })}
                </option>
              ))}
            </optgroup>
          )}
        </StyledSelector>
      </div>

      <label
        htmlFor="result"
        style={{ marginRight: "8px", marginLeft: i18n.language === "ar" ? 0 : 8 }}
      >
        {t("setResult:selectResult", { defaultValue: "Select Result" })} :
      </label>
      <StyledSelector id="result" value={result} onChange={handleChange}>
        <option value="negative">{t("setResult:negative", { defaultValue: "Negative" })}</option>
        <option value="unknown">{t("setResult:unknown", { defaultValue: "Unknown" })}</option>
        <option value="positive">{t("setResult:positive", { defaultValue: "Positive" })}</option>
      </StyledSelector>
    </div>
  );
};

export default SetResult;