const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const config = require('../config.json')
const commonConfig = require('./webpack.common.config')
const genStyleLoadersAndPlugins = require('./style.loaders')

const styleOptions = genStyleLoadersAndPlugins(true)

const devConfig = merge(commonConfig, {
    mode: 'development',
    module: {
        rules: styleOptions.loaders
    },
    plugins: [
        new HtmlWebpackIncludeAssetsPlugin({
            assets: [
                // moment
                'https://cdn.jsdelivr.net/npm/moment@2.22.2/moment.js',
                'https://cdn.jsdelivr.net/npm/moment@2.22.2/locale/zh-cn.js',
                // vue libs
                'https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js',
                'https://cdn.jsdelivr.net/npm/vue-router@3.0.1/dist/vue-router.js',
                'https://cdn.jsdelivr.net/npm/vuex@3.0.1/dist/vuex.js',
                // element-ui
                'https://cdn.jsdelivr.net/npm/element-ui@2.4.8/lib/index.js',
                'https://cdn.jsdelivr.net/npm/element-ui@2.4.8/lib/theme-chalk/index.css',
                // socket.io
                'https://cdn.jsdelivr.net/npm/socket.io-client@2.1.1/dist/socket.io.dev.js'
            ],
            append: false
        }),
        ...styleOptions.plugins
    ],
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
        open: false,
        useLocalIp: true
    }
})

module.exports = devConfig
