module.exports = {
  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  useTabs: false,
  printWidth: 120,
  importOrderParserPlugins: ["typescript", "decorators-legacy", "jsx"],
  plugins: [
      require.resolve('@trivago/prettier-plugin-sort-imports')
  ],
};
