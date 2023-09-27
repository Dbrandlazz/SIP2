"use client";
import React, { useState } from "react";
import Image from "next/image";
import { 
  RuleBasedResults,
  SYMPTOM_CONDITION_RULES,
  evaluateRules
} from "../lib/rules/evaluate"


/**
 * Diagnosis Component.
 * 
 * @returns {React.Element} The rendered Diagnosis component.
 */

const Diagnosis: React.FC = () => {
  const [results, setResults] = useState<RuleBasedResults | null>(null);
  const symptoms = Object.values(SYMPTOM_CONDITION_RULES).flat();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const answers = symptoms.filter((symptom) => form[symptom].checked);

    if (answers.length === 0) {
      // Validasi input: Jika tidak ada gejala yang dipilih, tampilkan pesan kesalahan
      alert("Pilih setidaknya satu gejala sebelum melakukan diagnosa.");
      return;
    }

    const computedResults = evaluateRules(answers);
    setResults(computedResults);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <Image src="/images/up.jpg" width={800} height={500} alt="Mental" />
        <div className="mt-8 text-center text-2xl text-gray-900 font-bold">
          Sistem Pakar Gangguan Kesehatan Mental
        </div>
        <div className="mt-8 text-center text-xl text-gray-900 font-bold">
          Jawablah Pertanyaan Dibawah ini, lalu tekan diagnosa
        </div>
        <div className="p-8 text-gray-900">
          <form onSubmit={handleSubmit} className="space-y-4">
            {symptoms.map((symptom, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={symptom}
                  name={symptom}
                  className="form-checkbox h-5 w-5"
                />
                <label htmlFor={symptom} className="text-lg">
                  {symptom}
                </label>
              </div>
            ))}
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded hover:from-teal-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Diagnosa
            </button>
          </form>
          {results && (
            <div className="mt-8 bg-gray-100 p-4 rounded">
              <h2 className="text-xl font-bold mb-4">Hasil Diagnosa:</h2>
              {Object.entries(results)
                .filter(([_, value]) => value > 0)
                .sort(([, a], [, b]) => b - a) 
                .map(([condition, symptomCount]) => (
                  <div key={condition} className="mb-2">
                    <span className="font-medium">
                      {condition} ({symptomCount} gejala)
                    </span>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Diagnosis;
