// web pack config
const rewireReactHotLoader = require('react-app-rewire-hot-loader')
const { alias, configPaths } = require('react-app-rewire-alias')
const aliasMap = configPaths('./tsconfig.paths.json')

module.exports = function override(config, env) {
  config = rewireReactHotLoader(config, env)
  alias(aliasMap)(config)
  return config
}
