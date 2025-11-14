import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next"; // added
import { StyledSelector } from "./style";

// result :string in ['low', 'medium', 'high']
// stored in localStorage (use PredictionResult.tsx)
const SetResult = () => {
  const { t, i18n } = useTranslation(); // added
  const [result, setResult] = useState<string>("negative");

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
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setResult(selectedValue);
    localStorage.setItem("predictionResult", selectedValue);
    console.log(`Selected result: ${selectedValue}`);
  };

  return (
    // set dir so browser aligns select and label for Arabic automatically
    <div className="set-result" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <label
        htmlFor="result"
        style={{ marginRight: "8px", marginLeft: i18n.language === "ar" ? 0 : 8 }}
      >
        {t("setResult:selectResult")} :
      </label>
      <StyledSelector id="result" value={result} onChange={handleChange}>
        <option value="negative">{t("setResult:negative")}</option>
        <option value="unknown">{t("setResult:unknown")}</option>
        <option value="positive">{t("setResult:positive")}</option>
      </StyledSelector>
    </div>
  );
};

export default SetResult;