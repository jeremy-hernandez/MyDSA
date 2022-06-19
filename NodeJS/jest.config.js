// because chalk uses package.json imports and jest is not handling it,
// a simple work around is to include them as a mapper here
const chalkMapper = {
  '^#ansi-styles$':
    '<rootDir>/node_modules/chalk/source/vendor/ansi-styles/index.js',
  '^#supports-color$':
    '<rootDir>/node_modules/chalk/source/vendor/supports-color/index.js',
};

const config = {
  moduleNameMapper: {
    '^#src(.*)$': '<rootDir>/src$1',
    ...chalkMapper,
  },
  // you can add other modules here that give trouble during testing by adding |module
  // (?!<module1>|<module2>)
  // reference: https://stackoverflow.com/questions/60714101/how-to-setup-jest-with-node-modules-that-use-es6
  transformIgnorePatterns: ['node_modules/(?!chalk)'],
};

export default config;
