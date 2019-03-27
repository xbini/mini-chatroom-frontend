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
                // libs should be loaded via cdn
                // moment
                'https://cdn.jsdelivr.net/npm/moment/moment.js',
                'https://cdn.jsdelivr.net/npm/moment/locale/zh-cn.js',
                // perfect-scrollbar
                'https://cdn.jsdelivr.net/npm/perfect-scrollbar/dist/perfect-scrollbar.js',
                'https://cdn.jsdelivr.net/npm/perfect-scrollbar/css/perfect-scrollbar.css',
                // vue libs
                'https://cdn.jsdelivr.net/npm/vue/dist/vue.js',
                'https://cdn.jsdelivr.net/npm/vue-router/dist/vue-router.js',
                'https://cdn.jsdelivr.net/npm/vuex/dist/vuex.js',
                // element-ui
                'https://cdn.jsdelivr.net/npm/element-ui/lib/index.js',
                'https://cdn.jsdelivr.net/npm/element-ui/lib/theme-chalk/index.css',
                // socket.io
                'https://cdn.jsdelivr.net/npm/socket.io-client/dist/socket.io.dev.js'
            ],
            append: false
        }),
        ...styleOptions.plugins
    ],
    devServer: {
        contentBase: path.resolve(__dirname, '../dist/'),
        stats: {
            children: false
        },
        proxy: [
            {
                context: ['/api/'],
                target: config.server.api,
                changeOrigin: true,
                secure: false
            }
        ],
        overlay: true,
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
