require('dotenv').config()

const path = require('path')
const Dotenv = require('dotenv-webpack')
const withTypescript = require('@zeit/next-typescript')

module.exports = withTypescript({
  webpack: (config) => {
    config.plugins = config.plugins || []

    config.plugins = [
      ...config.plugins,

      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true
      })
    ]

    return config
  }
})

// Dev using Docker
// module.exports = withTypescript({
//   webpackDevMiddleware: (config) => {
//     config.watchOptions = {
//       aggregateTimeout: 100,
//       poll: 500,
//     };
//     return config;
//   }
// })
