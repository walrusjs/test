/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  projects: [
    {
      displayName: 'dom',
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/src/**/__tests__/dom.test.[jt]s?(x)'],
    },
    {
      displayName: 'ssr',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/src/**/__tests__/ssr.test.[jt]s?(x)'],
    },
  ],
  testMatch: undefined
};

module.exports = config;
