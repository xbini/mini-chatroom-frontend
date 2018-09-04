const path = require('path')
const merge = require('webpack-merge')
const config = require('../config.json')
const commonConfig = require('./webpack.common.config')

let devConfig = merge(commonConfig, {
    devServer: {
        contentBase: path.resolve(__dirname, '../dist/'),
        proxy: [{
            context: [
                '/api/'
            ],
            target: config.server,
            changeOrigin: true,
            secure: false
        }],
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
