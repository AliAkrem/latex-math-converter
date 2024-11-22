import { 
  createSymbolMap, 
  createConversionRules, 
  validateInput 
} from './utils';
import { 
  applySymbolMap, 
  applyConversionRules, 
  addSpacing 
} from './converters';
import { 
  LatexSymbolMap, 
  ConversionOptions 
} from './types';

export function createLatexConverter(
  customSymbols: LatexSymbolMap = {}
) {
  const symbolMap = { 
    ...createSymbolMap(),
    ...customSymbols
  };
  const conversionRules = createConversionRules();

  function convert(
    latex: string, 
    options: ConversionOptions = {}
  ): string {

    validateInput(latex);


    // remove extra whitespace
    let result = latex
      .replace(/\s+/g, ' ')
      .trim();

      

    result = applyConversionRules(result, conversionRules);
    result = applySymbolMap(result, symbolMap);

    
    result = result.replace(/\{|\}/g, '');

    if (options.addSpacing) {
      result = addSpacing(result);
    }

    return result;
  }


  function addSymbol(
    latexCommand: string, 
    mathSymbol: string
  ): void {
    if (!latexCommand.startsWith('\\')) {
      throw new Error('LaTeX command must start with \\');
    }
    symbolMap[latexCommand] = mathSymbol;
  }

  return {
    convert,
    addSymbol
  };
}

export default createLatexConverter;
export * from './types';
