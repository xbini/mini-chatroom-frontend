const path = require('path')
const merge = require('webpack-merge')
const config = require('../config.json')
const commonConfig = require('./webpack.common.config')
const genStyleLoaders = require('./style.loaders')

const devConfig = merge(commonConfig, {
    mode: 'development',
    module: {
        rules: genStyleLoaders()
    },
    devServer: {
        contentBase: path.resolve(__dirname, '../dist/'),
        proxy: [
            {
                context: ['/api/'],
                target: config.server.api,
                changeOrigin: true,
                secure: false
            }
        ],
        clientLogLevel: 'info',
        disableHostCheck: true,
        compress: true,
        port: 1500,
        host: '0.0.0.0',
        open: true,
        useLocalIp: true
    }
})

module.exports = devConfig
