import React, { useState } from 'react';
import { Database, FileCode, ArrowRightLeft, Copy, CheckCircle2 } from 'lucide-react';
import Input from './components/Input';
import TextArea from './components/TextArea';
import Button from './components/Button';
import { sqlParaDelphi, delphiParaSql } from './services/conversionService';

const App: React.FC = () => {
  const [nomeVariavel, setNomeVariavel] = useState<string>("texto");
  const [entrada, setEntrada] = useState<string>("");
  const [saida, setSaida] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const handleNomeVariavelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove caracteres não alfanuméricos (exceto underscore)
    const valorLimpo = e.target.value.replace(/[^a-zA-Z0-9_]/g, "");
    setNomeVariavel(valorLimpo);
  };

  const handleSqlToDelphi = () => {
    const result = sqlParaDelphi({
      nomeVariavel: nomeVariavel,
      entrada: entrada
    });
    setSaida(result.saida);
  };

  const handleDelphiToSql = () => {
    const result = delphiParaSql({
      nomeVariavel: nomeVariavel,
      entrada: entrada
    });
    setSaida(result.saida);
  };

  const handleCopy = async () => {
    if (!saida) return;
    try {
      await navigator.clipboard.writeText(saida);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-slate-200">
          
          {/* Header */}
          <div className="bg-indigo-700 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-600 rounded-lg shadow-inner">
                <ArrowRightLeft className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Conversor SQL Delphi</h1>
                <p className="text-indigo-200 text-xs">Utilitário de formatação de código</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Variable Name Input */}
            <div>
              <Input
                id="nomeVariavel"
                label="Nome da variável Delphi"
                value={nomeVariavel}
                onChange={handleNomeVariavelChange}
                placeholder="Ex: QryRelatorio"
              />
              <p className="mt-1 text-xs text-slate-500 ml-0.5">
                Sem espaços ou caracteres especiais (apenas letras, números e _).
              </p>
            </div>

            {/* Input Area */}
            <div className="h-48">
              <TextArea
                id="entrada"
                label="Entrada (SQL ou Delphi)"
                placeholder="Cole aqui seu SQL puro ou código Delphi (Ex: texto.Sql.Add('...'))"
                value={entrada}
                onChange={(e) => setEntrada(e.target.value)}
                className="font-mono text-sm leading-relaxed"
              />
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button 
                onClick={handleSqlToDelphi} 
                variant="primary"
                className="w-full flex items-center justify-center gap-2"
              >
                <Database className="w-4 h-4" />
                SQL → Delphi
              </Button>
              <Button 
                onClick={handleDelphiToSql} 
                variant="secondary"
                className="w-full flex items-center justify-center gap-2"
              >
                <FileCode className="w-4 h-4" />
                Delphi → SQL
              </Button>
            </div>

            {/* Output Area */}
            <div className="relative">
              <div className="h-64">
                <TextArea
                  id="saida"
                  label="Resultado"
                  value={saida}
                  readOnly
                  className="bg-slate-50 text-slate-800 font-mono text-sm leading-relaxed"
                />
              </div>
              
              {/* Copy Button Absolute Positioned */}
              {saida && (
                <div className="absolute top-8 right-3">
                  <button
                    onClick={handleCopy}
                    className="p-1.5 bg-white border border-slate-200 rounded-md shadow-sm hover:bg-slate-50 transition-colors group"
                    title="Copiar para área de transferência"
                  >
                    {copied ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Footer */}
          <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 text-center">
            <p className="text-xs text-slate-500">
              Transforme consultas SQL em strings Delphi (TStrings) e vice-versa instantaneamente.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;