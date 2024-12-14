export default {
  roots: ['<rootDir>/apps/', '<rootDir>/libs/'],
  moduleNameMapper: {
    '^@server/entities(|/.*)$': '<rootDir>/libs/entities/src/$1',
    '^@server/common(|/.*)$': '<rootDir>/libs/common/src/$1',
    '^@server/services(|/.*)$': '<rootDir>/libs/services/src/$1',
    '^@server/core(|/.*)$': '<rootDir>/libs/core/src/$1',
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testEnvironment: 'node',
};
