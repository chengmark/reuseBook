// web pack config
// eslint-disable-next-line @typescript-eslint/no-var-requires
const rewireReactHotLoader = require('react-app-rewire-hot-loader')

module.exports = function override(config, env) {
  config = rewireReactHotLoader(config, env)
  return config
}
