const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.config')

let prodConfig = merge(commonConfig, {
    mode: 'production'
})
module.exports = prodConfig
