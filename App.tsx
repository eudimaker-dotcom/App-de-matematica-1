import React, { useState } from 'react';
import { BrainCircuit, BookOpen, History } from 'lucide-react';
import InputSection from './components/InputSection';
import OutputSection from './components/OutputSection';
import { solveMathProblem } from './services/geminiService';

const App: React.FC = () => {
  const [solution, setSolution] = useState<string | null>(null);
  const [isSolving, setIsSolving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSolve = async (text: string, image: string | null) => {
    setIsSolving(true);
    setError(null);
    setSolution(null);

    try {
      const result = await solveMathProblem(text, image);
      setSolution(result);
    } catch (err: any) {
      setError(err.message || "Algo correu mal. Tente novamente.");
    } finally {
      setIsSolving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-600/20">
              <BrainCircuit className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">
              MathSolver<span className="font-light text-slate-400">.ai</span>
            </h1>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Histórico</a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Configurações</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Introduction & Input */}
          <div className="lg:col-span-5 space-y-6">
            <div className="prose prose-slate">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
                Resolva qualquer problema matemático em segundos.
              </h2>
              <p className="text-slate-600 leading-relaxed">
                De Álgebra básica a Cálculo avançado. Tire uma foto ou digite seu problema para receber uma explicação passo a passo detalhada.
              </p>
            </div>

            <InputSection onSolve={handleSolve} isSolving={isSolving} />

            {/* Examples / Features list */}
            <div className="hidden md:grid grid-cols-2 gap-4 pt-4">
               <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-2 mb-2 text-purple-600">
                    <BookOpen className="w-5 h-5" />
                    <span className="font-semibold text-sm">Passo a Passo</span>
                  </div>
                  <p className="text-xs text-slate-500">Explicações detalhadas para cada etapa da resolução.</p>
               </div>
               <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-2 mb-2 text-orange-600">
                    <History className="w-5 h-5" />
                    <span className="font-semibold text-sm">Memória</span>
                  </div>
                  <p className="text-xs text-slate-500">Retoma o contexto anterior para explicar dúvidas.</p>
               </div>
            </div>
          </div>

          {/* Right Column: Output */}
          <div className="lg:col-span-7 min-h-[500px]">
            <OutputSection solution={solution} error={error} />
          </div>

        </div>
      </main>
      
      <footer className="py-8 text-center text-slate-400 text-sm">
        <p>© 2024 MathSolver AI. Powered by Google Gemini.</p>
      </footer>
    </div>
  );
};

export default App;
