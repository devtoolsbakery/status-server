const withCSS = require('@zeit/next-css')
const webpack = require('webpack')

const localEnv = {
  API_ENDPOINT: 'http://localhost:3001'
}

module.exports = withCSS({
  webpack(config, options) {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv))

    return config;
  }
})
