# LaTeX Math Converter

## Overview
LaTeX Math Converter is a tool designed to convert mathematical expressions written in LaTeX into other formats. It aims to simplify the process of integrating LaTeX math into various applications like  [mathjs](https://mathjs.org/).


## Usage
Provide instructions on how to use the package in a project.
soon

```js
const {createLatexConverter} = require('latex-math-converter')
``` 
## Example usage

```js
const latexExpression = '\\frac{a}{b}';
const converter = createLatexConverter()

console.log(converter.convert(latexExpression)) // => (a)/(b)
```