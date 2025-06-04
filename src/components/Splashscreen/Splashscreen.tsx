import React, { useState } from 'react';

const SplashScreen: React.FC = () => {
  const [language, setLanguage] = useState<string>('English');
  const [result, setResult] = useState<string>('');

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl overflow-hidden">
        {/* Splash graphic */}
        <div className="bg-gradient-to-br from-green-400 via-blue-500 to-green-300 p-10 text-center relative">
          <div className="bg-white w-16 h-16 mx-auto rounded-2xl flex items-center justify-center">
            <span className="text-green-600 text-3xl font-bold">✓</span>
          </div>
          <h1 className="text-white text-3xl font-extrabold mt-4">Virufy</h1>
        </div>

        <div className="p-6">
          {/* Language Selector */}
          <label className="block mb-2 font-semibold text-gray-700">Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full border rounded-md px-4 py-2 mb-4 bg-gray-50"
          >
            <option value="English">English</option>
            {/* Add more languages here if needed */}
          </select>

          {/* Description */}
          <div className="text-sm text-gray-800 space-y-2">
            <p>
              <strong>Virufy</strong> is a robust <strong>501(c)(3) nonprofit</strong> company with <strong>250 volunteers/staff</strong> and <strong>50 partner organizations</strong> including Amazon Web Services, Stanford COVID-19 Response Innovation Lab, and One Young World.
            </p>
            <p>
              We’ve developed a smartphone app which leverages AI to analyze the signature of recorded coughs to <strong>determine disease risk status (e.g. TB, COPD, COVID-19, flu)</strong>. Virufy is supported by faculty and alumni from Stanford, MIT, and Harvard.
            </p>
            <p>
              By collecting <strong>coughs recordings</strong> from people around the world, Virufy is improving the robustness of its AI algorithm in recognizing unique disease sound patterns.
            </p>
            <p className="italic text-gray-600 text-xs">
              <strong>Please note:</strong> This form is for data collection only. It will not predict your COVID-19 status or diagnose any disease, disorder, or other health condition. Virufy is conducting research and will use the information you provide for that research only. Virufy will not take the place of a doctor and reminds you it is your responsibility to seek medical advice.
            </p>
            <p className="text-sm font-semibold text-center">
              By proceeding you accept the<br />
              terms of our <a href="#" className="underline text-blue-600">Privacy Policy</a>
            </p>
          </div>

          {/* Result Dropdown */}
          <select
            value={result}
            onChange={(e) => setResult(e.target.value)}
            className="w-full border rounded-md px-4 py-2 mt-4 bg-gray-50"
          >
            <option value="">Select result</option>
            <option value="positive">Positive</option>
            <option value="negative">Negative</option>
          </select>

          {/* Consent Button */}
          <button
            className="w-full mt-6 bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
            onClick={() => console.log({ language, result })}
          >
            Consent
          </button>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
