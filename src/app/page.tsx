'use client'
import React, { useState } from 'react';
import Image from 'next/image'

// ... (Insert the translated TypeScript logic here)
type Conditions = {
  [key: string]: number;
}

type ConditionalProbabilities = {
  [condition: string]: {
      [symptom: string]: number;
  };
}

const priors: Conditions = {
  "Depresi": 0.1,
  "Kecemasan": 0.1,
  "OCD": 0.05,
  "Gangguan Bipolar": 0.05,
  "Skizofrenia": 0.02
};

const conditionalProbabilities: ConditionalProbabilities = {
  "Depresi": {
      "Perasaan sedih atau putus asa yang berkepanjangan?": 0.8,
      "Kehilangan minat dalam aktivitas yang sebelumnya disukai?": 0.7,
      "Perubahan nafsu makan atau berat badan?": 0.6,
      "Kesulitan tidur atau tidur berlebihan?": 0.6,
      "Kelelahan atau kurangnya energi?": 0.7
  },
  "Kecemasan": {
      "Kecemasan berlebihan tentang situasi sehari-hari?": 0.7,
      "Detak jantung cepat?": 0.6,
      "Gemeteran atau menggigil?": 0.6,
      "Merasa gelisah atau tegang?": 0.7,
      "Kesulitan berkonsentrasi?": 0.5
  },
  "OCD": {
      "Pikiran atau dorongan berulang yang tidak diinginkan?": 0.9,
      "Perlu melakukan rutinitas tertentu berulang kali?": 0.8,
      "Menghabiskan setidaknya 1 jam sehari pada pikiran atau perilaku ini?": 0.7,
      "Pikiran atau kebiasaan menyebabkan penderitaan yang signifikan?": 0.6,
      "Perilaku bukan karena obat atau kondisi medis lainnya?": 0.5
  },
  "Gangguan Bipolar": {
      "Periode suasana hati atau iritabilitas yang meningkat?": 0.8,
      "Peningkatan aktivitas atau level energi?": 0.7,
      "Merasa luar biasa 'bahagia' atau optimis?": 0.6,
      "Kebutuhan tidur yang berkurang?": 0.6,
      "Perilaku impulsif atau ceroboh?": 0.7
  },
  "Skizofrenia": {
      "Halusinasi (melihat atau mendengar hal yang tidak ada)?": 0.9,
      "Delusi (keyakinan kuat yang tidak didasarkan pada kenyataan)?": 0.8,
      "Pikiran atau ucapan yang tidak terorganisir?": 0.7,
      "Gejala negatif (emosi atau motivasi yang berkurang)?": 0.6,
      "Kemampuan kognitif yang terganggu (memori, perhatian)?": 0.5
  }
};


const overallSymptomProbabilities: { [symptom: string]: number } = {};
for (const condition in conditionalProbabilities) {
  for (const symptom in conditionalProbabilities[condition]) {
      overallSymptomProbabilities[symptom] = 0.1;
  }
}

function computePosterior(answers: boolean[]): Conditions {
  const posteriors: Conditions = { ...priors };

  let index = 0;
  for (const symptom in overallSymptomProbabilities) {
      if (answers[index]) {
          for (const condition in conditionalProbabilities) {
              const likelihood = conditionalProbabilities[condition][symptom] || 0;
              const evidence = overallSymptomProbabilities[symptom];
              posteriors[condition] *= likelihood / evidence;
          }
      }
      index++;
  }

  const total = Object.values(posteriors).reduce((a, b) => a + b, 0);
  for (const condition in posteriors) {
      posteriors[condition] /= total;
  }

  return posteriors;
}



const Diagnosis: React.FC = () => {
    const [results, setResults] = useState<Conditions | null>(null);
    
    const questions = Object.keys(overallSymptomProbabilities);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const answers = questions.map(q => form[q].checked);
        const computedResults = computePosterior(answers);
        setResults(computedResults);
    };

    return (
<div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
   
            <div className="md:flex-shrink-0">
            <Image
                src="/images/up.jpg"
                width={800}
                height={500}
                alt="Mental"
              />
            
                <div className='mt-8 text-center text-2xl text-gray-900 font-bold'>Sistem Pakar Gangguan Kesehatan Mental</div>
                <div className='mt-8 text-center text-xl text-gray-900 font-bold'>Jawablah Pertanyaan Dibawah ini, lalu tekan diagnosa </div>
           
         
            <div className="p-8 text-gray-900">
                      <form onSubmit={handleSubmit} className="space-y-4">
                          {questions.map((q, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                  <input type="checkbox" id={q} name={q} className="form-checkbox h-5 w-5" />
                                  <label htmlFor={q} className="text-lg">{q}</label>
                              </div>
                          ))}
                          <button type="submit" className="mt-4 px-4 py-2 bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded hover:from-teal-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Diagnosa</button>
                      </form>

                      {results && (
                          <div className="mt-8 bg-gray-100 p-4 rounded">
                              <h2 className="text-xl font-bold mb-4">Results:</h2>
                              {Object.values(results).some(value => isNaN(value)) ? (
                                          <div className="text-red-600">Tidak dapat mendiagnosis berdasarkan gejala yang diberikan. Harap berikan informasi lebih lanjut atau konsultasikan dengan profesional.</div>
                                          ) : Math.max(...Object.values(results)) < 0.1 ? (
                                              <div className="text-red-600">Tidak ada penyakit.</div>
                                          ) : (
                                    Object.entries(results).map(([condition, probability]) => (
                                        <div key={condition} className="mb-2">
                                            <span className="font-medium">{condition}:</span> {probability.toFixed(2)}
                                        </div>
                                    ))
                                )}
                          </div>
                      )}
                  </div>
              </div>
          </div>
      </div>
  );
}

export default Diagnosis;
