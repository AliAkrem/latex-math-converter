import { BASIC_SYMBOLS, GREEK_LETTERS, MATH_SYMBOLS } from './constants';
import {
  LatexSymbolMap,
  ConversionRule
} from './types';

export function createSymbolMap(): LatexSymbolMap {
  return {
    ...BASIC_SYMBOLS,
    ...GREEK_LETTERS,
    ...MATH_SYMBOLS
  };
}


/**
 * Creates a set of conversion rules for transforming LaTeX math expressions
 * into a different format using regular expressions.
 * @returns {ConversionRule[]} An array of conversion rules, each containing a
 * regular expression pattern and a replacement string or function.
 */
export function createConversionRules(): ConversionRule[] {
  return [
    // 1. Fraction conversion: \frac{numerator}{denominator} to (numerator)/(denominator)
    // example: '\\frac{6}{2}' // becomes (6)/(2)
    { 
      pattern: /\\frac\{([^{}]+)\}\{([^{}]+)\}/g, 
      replacement: '($1)/($2)',
    },
  
    // 2. Simple square root conversion: \sqrt{expression} to sqrt(expression)
    // example: '\\sqrt{16}' // becomes sqrt(16)
    { 
      pattern: /\\sqrt\{(((?![\{\}]).)*)\}/g, 
      replacement: 'sqrt($1)',
    },
  
    // 3. Nth root conversion: \sqrt[n]{expression} to pow(expression, 1/n)
    // example: '\\sqrt[3]{27}' // becomes pow(27, 1/3)
    { 
      pattern: /\\sqrt\[(((?![\{\}]).)*)\]\{(((?![\{\}]).)*)\}/g, 
      replacement: 'pow($3, 1/$1)',
    },
  
    // 4. Exponent with curly braces: base^{exponent}
    // example: '2^{3}' // becomes pow(2,3)
    { 
      pattern: /([0-9a-zA-Z\.]+)\^\{(((?![\{\}]).)*)\}/g, 
      replacement: 'pow($1, $2)',
    },
  
    // 5. Simple exponent: base^exponent
    // example: '2^3' // becomes pow(2,3)
    { 
      pattern: /([0-9a-zA-Z\.]+)\^([0-9a-zA-Z\.]+)/g, 
      replacement: 'pow($1, $2)',
    },
  
    // 6. Parenthesized base with simple exponent
    // example: '\\left(2+3\\right)^2' // becomes pow(2+3,2)
    { 
      pattern: /\\left\(([0-9a-zA-Z\.\+\*\-\\]+)\\right\)\^([0-9a-zA-Z\.]+)/g, 
      replacement: 'pow($1, $2)',
    },
  
    // 7. Parenthesized base with curly brace exponent
    // example: '\\left(2+3\\right)^{2}' // becomes pow(2+3,2)
    { 
      pattern: /\\left\(([0-9a-zA-Z\.\+\*\-\\]+)\\right\)\^\{(((?![\{\}]).)*)\}/g, 
      replacement: 'pow($1, $2)',
    },
  
    // 8. More complex parenthesized base with curly brace exponent
    // example: '\\left(2+3/4\\right)^{2}' // becomes pow(2+3/4,2)
    { 
      pattern: /\\left\(([0-9a-zA-Z\.\+\*\-\\\(\)\/]+)\\right\)\^\{(((?![\{\}]).)*)\}/g, 
      replacement: 'pow($1, $2)',
    },
  
    // 9. Subscript handling
    // example: 'x_{1}' // becomes x_1
    { 
      pattern: /_(\{[^{}]+\}|\d)/g, 
      replacement: (match: string, group: string) => `_${group.replace(/\{|\}/g, '')}`,
    }
  ]
}


/**
 * validate that value is type of String 
 * 
 * @throws TypeErrorConstructor
 */
export function validateInput(latex: unknown): asserts latex is string {
  if (typeof latex !== 'string') {
    throw new TypeError('Input must be a string');
  }
}
