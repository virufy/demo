import { useState, useEffect } from 'react';
import { StyledSelector } from './style';

// result :string in ['low', 'medium', 'high']
// stored in localStorage (use PredictionResult.tsx)
const SetResult = () => {
  const [result, setResult] = useState<string>('negative');

  useEffect(() => {
    const storedResult = localStorage.getItem('predictionResult');
    if (
      storedResult
      && (storedResult === 'negative'
      || storedResult === 'unknown'
      || storedResult === 'positive')
    ) {
      setResult(storedResult);
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setResult(selectedValue);
    localStorage.setItem('predictionResult', selectedValue);
    console.log(`Selected result: ${selectedValue}`);
  };

  return (
    <div>
      <label htmlFor="result" style={{ marginRight: '8px' }}>
        Select Result :
      </label>
      <StyledSelector id="result" value={result} onChange={handleChange}>
        <option value="negative">Negative</option>
        <option value="unknown">Unknown</option>
        <option value="positive">Positive</option>
      </StyledSelector>
    </div>
  );
};

export default SetResult;
