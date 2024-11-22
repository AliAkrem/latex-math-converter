import { 
  LatexSymbolMap, 
  ConversionOptions, 
  ConversionRule 
} from './types';

export function applySymbolMap(
  text: string, 
  symbolMap: LatexSymbolMap
): string {
  return Object.entries(symbolMap).reduce(
    (result, [latexSymbol, mathSymbol]) => 
      result.replace(
        new RegExp(latexSymbol.replace(/\\/g, '\\\\'), 'g'), 
        mathSymbol
      ),
    text
  );
}

export function applyConversionRules(
  text: string, 
  rules: ConversionRule[]
): string {
  return rules.reduce(
    (result, rule) => 
      result.replace(rule.pattern, rule.replacement as string),
    text
  );
}



export function addSpacing(text: string): string {
  return text.replace(/([*/±=<>])/g, ' $1 ').trim();
}