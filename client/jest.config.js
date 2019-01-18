module.exports = {
  setupTestFrameworkScriptFile: '<rootDir>/test/testSetup.js',
  moduleNameMapper: {
    '\\.module.css$': 'odentity-obj-proxy',
    '\\.css$': require.resolve('./test/style-mock.js')
  }
}
