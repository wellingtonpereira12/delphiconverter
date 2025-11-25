export interface ConversionInputs {
  nomeVariavel: string;
  entrada: string;
}

export interface ConversionOutput {
  saida: string;
}

/**
 * Converts raw SQL text to Delphi TStrings.Add code.
 */
export const sqlParaDelphi = (inputs: ConversionInputs): ConversionOutput => {
  const nome = inputs.nomeVariavel || "texto";
  const sql = inputs.entrada || "";

  const linhas = sql
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 0)
    .map(l => `${nome}.Sql.Add('${l.replace(/'/g, "''")}');`)
    .join('\n');

  return {
    saida: linhas
  };
};

/**
 * Converts Delphi TStrings.Add code back to raw SQL.
 */
export const delphiParaSql = (inputs: ConversionInputs): ConversionOutput => {
  const delphi = inputs.entrada || "";

  const linhas = delphi
    .split('\n')
    .map(l => {
      // Regex adapts to standard Delphi string building syntax
      // 1. Remove everything up to "Sql.Add('" (case insensitive)
      // 2. Remove the trailing "');" (case insensitive)
      // 3. Replace double quotes ('') with single quotes (')
      return l
        .replace(/.*Sql\.Add\('/i, "")
        .replace(/'\);/i, "")
        .replace(/''/g, "'")
        .trim();
    })
    .filter(l => l !== "")
    .join('\n');

  return {
    saida: linhas
  };
};