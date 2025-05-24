export default {
  transform: {
    '^.+\\.(ts|js)$': 'babel-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|js)$',
  moduleFileExtensions: ['ts', 'js'],
};
