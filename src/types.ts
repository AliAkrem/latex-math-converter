
export interface LatexSymbolMap {
    [key: string]: string;
  }
  
  export interface ConversionOptions {
    preserveFormatting?: boolean;
    addSpacing?: boolean;
  }
  
  export interface ConversionRule {
    pattern: RegExp;
    replacement: string | ((match: string, ...groups: string[]) => string);
  }