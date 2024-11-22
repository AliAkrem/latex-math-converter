import createLatexConverter from "..";


describe('Latex Converter', () => {
  let converter: ReturnType<typeof createLatexConverter>;

  beforeEach(() => {
    converter = createLatexConverter();
  });


  test('basic operators', () => {
    expect(converter.convert(`2 \\times 3`)).toBe('2 * 3');
    expect(converter.convert('4 \\div 2')).toBe('4 / 2');
    expect(converter.convert('1 \\cdot 2')).toBe('1 · 2');
  });

  test('fractions', () => {
    expect(converter.convert('\\frac{1}{2}')).toBe('(1)/(2)');
    expect(converter.convert('\\frac{x + 1}{y - 1}')).toBe('(x + 1)/(y - 1)');
  });

  test('with spacing option', () => {
    expect(converter.convert('2\\times3', { addSpacing: true })).toBe('2 * 3');
  });

  test('with spacing option', () => {
    expect(converter.convert('2\\div3', { addSpacing: true })).toBe('2 / 3');
  });



  test('power operator', () => {
    expect(converter.convert('1^2')).toBe('pow(1,2)');
  });

  test('power operator with {}', () => {
    expect(converter.convert('1^{2}')).toBe('pow(1,2)');
  });

  test('sqrt root operator', () => {
    expect(converter.convert('\\sqrt{4}')).toBe('sqrt(4)');
  });

  test("Should convert '\\sqrt{a+b}' to 'sqrt(a+b)' using simple square root conversion with expression", () => {
    expect(converter.convert('\\sqrt{a+b}')).toBe('sqrt(a+b)');
  });



  test('sqrt nth root operator', () => {
    expect(converter.convert('\\sqrt[3]{4}')).toBe('pow(4,1/3)');
  });



test('should convert \left(2+3\right)^2 to pow(2+3,2) using parenthesized base with simple exponent', () => {
  expect(converter.convert('\\left(2+3\\right)^2')).toBe('pow(2+3,2)');
});

  test('should convert \left(2+3\right)^{2} to pow(2+3,2) using parenthesized base with curly brace exponent', () => {
    expect(converter.convert('\\left(2+3\\right)^{2}')).toBe('pow(2+3,2)');
  });


  test('should convert \left(2+3/4\right)^{2} to pow(2+3/4,2) using more complex parenthesized base with curly brace exponent', () => {
    expect(converter.convert('\\left(2+3/4\\right)^{2}')).toBe('pow(2+3/4,2)');
  });



  test('should convert x_{1} to x_1 using subscript handling with a single digit', () => {
    expect(converter.convert('x_{1}')).toBe('x_1');
  });

  test('should convert x_{abc} to x_abc using subscript handling with multiple characters', () => {
    expect(converter.convert('x_{abc}')).toBe('x_abc');
  });


  test("Should convert '\\sqrt[5]{32}' to 'pow(32,1/5)' using nth root conversion with different root", () => {
    expect(converter.convert('\\sqrt[5]{32}')).toBe('pow(32,1/5)');
  });

  test('Should handle empty input string and return an empty string', () => {
    expect(converter.convert('')).toBe('');
  });

  
  test('custom symbol addition', () => {
    converter.addSymbol('\\newSymbol', '⊕');
    expect(converter.convert('a \\newSymbol b')).toBe('a ⊕ b');
  });

  test('error handling', () => {
    // @ts-expect-error Testing invalid input
    expect(() => converter.convert(123)).toThrow('Input must be a string');
    expect(() => converter.addSymbol('newSymbol', '⊕')).toThrow('LaTeX command must start with \\');
  });

  test('custom symbols on creation', () => {
    const customConverter = createLatexConverter({
      '\\mycustom': '⚡'
    });
    
    expect(customConverter.convert('a \\mycustom b')).toBe('a ⚡ b');
  });
});