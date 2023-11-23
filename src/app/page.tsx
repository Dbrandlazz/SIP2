"use client";
import React, { useState } from "react";
import Image from "next/image";
import { 
  RuleBasedResults,
  SYMPTOM_CONDITION_RULES,
  evaluateRules
} from "../lib/rules/evaluate"
import FloatingSVGs from "./component/FloatingSVG";

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
    <div className=" py-12 px-4 mx-auto">
      <div className="mt-8 text-center text-7xl text-white ">
          <p>
            Sistem Pakar Indikator Pemilihan Prodi
          </p>
          <p>
             Fmipa USk
          </p> 
        </div>
      <div className="max-w-md mx-auto bg-[#1D3C45] rounded-3xl  md:max-w-2xl z-50">
        <div className="mt-8 p-4 text-center text-2xl text-white ">
          Pilihlah minat yang anda minati
        </div>
        <div className="p-8 text-white">
          <form onSubmit={handleSubmit} className="space-y-4">
            {symptoms.map((symptom, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={symptom}
                  name={symptom}
                  className="form-checkbox text-teal-500 h-5 w-5"
                />
                <label htmlFor={symptom} className="text-xl">
                  {symptom}
                </label>
              </div>
            ))}
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-900 text-white rounded hover:from-emerald-500 hover:to-teal-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400"
            >
              Hasil
            </button>
          </form>
          {results && (
            <div className="mt-8 border border-white p-4 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Hasil Minat:</h2>
              {Object.entries(results)
                .filter(([_, value]) => value > 0)
                .sort(([, a], [, b]) => b - a) 
                .map(([condition, symptomCount]) => (
                  <div key={condition} className="mb-2">
                    <span className="font-medium">
                      {condition} ({symptomCount} minat)
                    </span>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
      <FloatingSVGs/>

    </div>
  );
};

export default Diagnosis;
