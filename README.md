# LaTeX Math Converter

## Overview
LaTeX Math Converter is a tool designed to convert mathematical expressions written in LaTeX into other formats. It aims to simplify the process of integrating LaTeX math into various applications like  [mathjs](https://mathjs.org/).


## Usage
Provide instructions on how to use this package in a project.
soon


## Start With

```ts
import createLatexConverter from "latex-math-converter";
``` 
## Example usage

```ts
const converter = createLatexConverter();

let operation1  = "\\frac{a}{b}";
let operation2  = "a+b";

console.log(converter.convert(operation1)); // => (a)/(b)
console.log(converter.convert(operation2, { addSpacing: true })); // => a + b 
```