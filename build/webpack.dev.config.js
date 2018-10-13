const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const config = require('../config.json')
const commonConfig = require('./webpack.common.config')
const genStyleLoaders = require('./style.loaders')

const devConfig = merge(commonConfig, {
    mode: 'development',
    module: {
        rules: genStyleLoaders()
    },
    plugins: [
        new HtmlWebpackIncludeAssetsPlugin({
            assets: [
                'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.1/moment.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.1/locale/zh-cn.js',
                'https://unpkg.com/vue/dist/vue.js',
                'https://unpkg.com/vue-router/dist/vue-router.js',
                'https://unpkg.com/vuex/dist/vuex.js'
            ],
            append: false
        })
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
