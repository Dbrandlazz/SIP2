"use client";
import React, { useState } from "react";
import Image from "next/image";

type RuleBasedResults = {
  [condition: string]: number;
};

type SYMPTOM_CONDITION_RULES = Record<string, string[]>;

const SYMPTOM_CONDITION_RULES: SYMPTOM_CONDITION_RULES = {
  Depresi: [
    "Perasaan sedih atau putus asa yang berkepanjangan?",
    "Kehilangan minat dalam aktivitas yang sebelumnya disukai?",
    "Perubahan nafsu makan atau berat badan?",
    "Kesulitan tidur atau tidur berlebihan?",
    "Kelelahan atau kurangnya energi?",
  ],
  Kecemasan: [
    "Kecemasan berlebihan tentang situasi sehari-hari?",
    "Detak jantung cepat?",
    "Gemeteran atau menggigil?",
    "Merasa gelisah atau tegang?",
    "Kesulitan berkonsentrasi?",
  ],
  OCD: [
    "Pikiran atau dorongan berulang yang tidak diinginkan?",
    "Perlu melakukan rutinitas tertentu berulang kali?",
    "Menghabiskan setidaknya 1 jam sehari pada pikiran atau perilaku ini?",
    "Pikiran atau kebiasaan menyebabkan penderitaan yang signifikan?",
    "Perilaku bukan karena obat atau kondisi medis lainnya?",
  ],
  "Gangguan Bipolar": [
    "Periode suasana hati atau iritabilitas yang meningkat?",
    "Peningkatan aktivitas atau level energi?",
    "Merasa luar biasa 'bahagia' atau optimis?",
    "Kebutuhan tidur yang berkurang?",
    "Perilaku impulsif atau ceroboh?",
  ],
  Skizofrenia: [
    "Halusinasi (melihat atau mendengar hal yang tidak ada)?",
    "Delusi (keyakinan kuat yang tidak didasarkan pada kenyataan)?",
    "Pikiran atau ucapan yang tidak terorganisir?",
    "Gejala negatif (emosi atau motivasi yang berkurang)?",
    "Kemampuan kognitif yang terganggu (memori, perhatian)?",
  ],
  "PTSD (Post-Traumatic Stress Disorder)": [
    "Mengalami kilas balik atau mimpi buruk tentang trauma?",
    "Menghindari tempat, orang, atau aktivitas yang mengingatkan pada trauma?",
    "Menjadi mudah terkejut atau kaget?",
    "Perasaan kebingungan atau kesulitan konsentrasi?",
    "Perasaan bersalah atau menyalahkan diri sendiri tentang trauma?",
  ],
  "Gangguan Kepribadian Borderline": [
    "Perubahan suasana hati yang cepat?",
    "Kesulitan dalam hubungan interpersonal?",
    "Ketakutan akan penolakan atau ditinggalkan?",
    "Tindakan impulsif dan berisiko?",
    "Perasaan kosong atau seolah-olah Anda tidak ada?",
  ],
  "Gangguan Pemakanan": [
    "Ketakutan berlebihan akan kenaikan berat badan?",
    "Menghindari makan di depan umum?",
    "Perubahan drastis dalam berat badan?",
    "Ketidakpuasan dengan bentuk tubuh?",
    "Penggunaan obat pelangsing tanpa resep?",
  ],
  "ADHD (Attention-Deficit/Hyperactivity Disorder)": [
    "Kesulitan dalam mempertahankan perhatian pada tugas atau aktivitas?",
    "Sering lupa dengan tugas sehari-hari?",
    "Sering berbicara berlebihan?",
    "Sulit untuk duduk diam?",
    "Sering menginterupsi atau menyela orang lain?",
  ],
};

const evaluateRules = (answers: string[]): RuleBasedResults => {
  const rulesResults: RuleBasedResults = {};

  for (const condition in SYMPTOM_CONDITION_RULES) {
    if (SYMPTOM_CONDITION_RULES.hasOwnProperty(condition)) {
      const matchingSymptoms = SYMPTOM_CONDITION_RULES[condition].filter(
        (symptom) => answers.includes(symptom)
      );
      rulesResults[condition] = matchingSymptoms.length;
    }
  }

  return rulesResults;
};

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
                .sort(([, a], [, b]) => b - a) // Urutkan kondisi berdasarkan jumlah gejala yang cocok (descending)
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
