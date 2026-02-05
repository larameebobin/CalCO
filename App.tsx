
import React, { useState, useEffect, useCallback } from 'react';
import { createChallenge, getCorrectionSteps } from './services/calculator';
import { Challenge, CommercialData, CommercialElement } from './types';
import { LABELS, UNIT } from './constants';
import FormulaSheet from './components/FormulaSheet';
import SolutionView from './components/SolutionView';

const App: React.FC = () => {
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [userInputs, setUserInputs] = useState<Partial<Record<CommercialElement, string>>>({});
  const [showSolution, setShowSolution] = useState(false);
  const [checked, setChecked] = useState(false);
  const [feedback, setFeedback] = useState<Record<string, boolean>>({});

  const generateNewChallenge = useCallback(() => {
    const newChallenge = createChallenge();
    setChallenge(newChallenge);
    setUserInputs({});
    setShowSolution(false);
    setChecked(false);
    setFeedback({});
  }, []);

  useEffect(() => {
    generateNewChallenge();
  }, [generateNewChallenge]);

  const handleInputChange = (key: CommercialElement, value: string) => {
    setUserInputs(prev => ({ ...prev, [key]: value }));
  };

  const checkResults = () => {
    if (!challenge) return;
    const newFeedback: Record<string, boolean> = {};
    const keys: CommercialElement[] = ['PAHT', 'PVHT', 'PVTTC', 'TMarge', 'TMarque', 'MB', 'K', 'TVA_MT'];

    keys.forEach(key => {
      if (challenge.givenKeys.includes(key)) return;
      const userVal = parseFloat(userInputs[key]?.replace(',', '.') || "0");
      const solVal = challenge.solution[key as keyof CommercialData] as number;
      const diff = Math.abs(userVal - solVal);
      // Tolérance de 0.1 pour les arrondis
      newFeedback[key] = diff < 0.15;
    });

    setFeedback(newFeedback);
    setChecked(true);
  };

  if (!challenge) return null;

  const elements: CommercialElement[] = ['PAHT', 'PVHT', 'PVTTC', 'TMarge', 'TMarque', 'MB', 'K', 'TVA_MT'];

  return (
    <div className="min-h-screen pb-20 bg-slate-50">
      <header className="bg-indigo-700 text-white py-10 shadow-lg mb-8 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-extrabold mb-2">Calculs Commerciaux BTS MCO</h1>
              <p className="text-indigo-100 opacity-90">Entraînement intensif aux marges et coefficients.</p>
            </div>
            <button 
              onClick={generateNewChallenge}
              className="bg-white text-indigo-700 font-bold px-6 py-3 rounded-xl shadow-md hover:bg-indigo-50 transition-all flex items-center gap-2"
            >
              <i className="fas fa-redo"></i> Nouveau Défi
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                <h2 className="text-xl font-bold text-slate-800 italic">Complétez le tableau :</h2>
                <div className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full font-bold">
                  TVA : {(challenge.tvaRate * 100).toFixed(1)} %
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {elements.map((key) => {
                  const isGiven = challenge.givenKeys.includes(key);
                  const isCorrect = checked && feedback[key];
                  const isWrong = checked && !feedback[key] && !isGiven;

                  return (
                    <div key={key} className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex justify-between">
                        <span>{LABELS[key]}</span>
                        <span>{UNIT[key]}</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          disabled={isGiven}
                          value={isGiven ? challenge.solution[key as keyof CommercialData] : (userInputs[key] || '')}
                          onChange={(e) => handleInputChange(key, e.target.value)}
                          className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all font-semibold text-lg
                            ${isGiven ? 'bg-slate-50 border-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white border-slate-200 focus:border-indigo-500'}
                            ${isCorrect ? 'border-green-500 bg-green-50 text-green-700' : ''}
                            ${isWrong ? 'border-red-500 bg-red-50 text-red-700' : ''}
                          `}
                        />
                        {isGiven && <i className="fas fa-lock absolute right-3 top-4 text-slate-300"></i>}
                        {isCorrect && <i className="fas fa-check-circle absolute right-3 top-4 text-green-500"></i>}
                        {isWrong && <i className="fas fa-times-circle absolute right-3 top-4 text-red-500"></i>}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={checkResults}
                  className="flex-1 bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transition-all shadow-lg"
                >
                  Vérifier les réponses
                </button>
                <button
                  onClick={() => setShowSolution(!showSolution)}
                  className="flex-1 bg-slate-100 text-slate-700 font-bold py-4 rounded-xl hover:bg-slate-200 transition-all"
                >
                  {showSolution ? "Masquer le corrigé" : "Voir le corrigé détaillé"}
                </button>
              </div>
            </div>

            {showSolution && <SolutionView steps={getCorrectionSteps(challenge)} />}
          </div>

          <div className="lg:col-span-1">
            <FormulaSheet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
