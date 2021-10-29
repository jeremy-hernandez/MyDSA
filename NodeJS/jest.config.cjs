module.exports = {
  moduleNameMapper: {
    '^#algs(.*)$': '<rootDir>/src/algorithms$1',
    '^#dss(.*)$': '<rootDir>/src/datastructures$1',
    '^#src(.*)$': '<rootDir>/src$1',
    ...CHALKJS_JEST_MAP_SUPPORT,
  },
  moduleDirectories: ['node_modules'],
  transform: {},
};
