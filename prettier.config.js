/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */

module.exports = {
  semi: false,
  singleQuote: true,
  arrowParens: 'avoid',
  trailingComma: 'none',
  endOfLine: 'auto',
  plugins: ['prettier-plugin-tailwindcss']
}
