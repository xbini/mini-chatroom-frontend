const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const commonConfig = require('./webpack.common.config')
const genStyleLoadersAndPlugins = require('./style.loaders')

const root = path.resolve(__dirname, '../')
const styleOptions = genStyleLoadersAndPlugins(true)

const prodConfig = merge(commonConfig, {
    mode: 'production',
    devtool: 'source-map',
    performance: {
        hints: 'error'
    },
    module: {
        rules: styleOptions.loaders
    },
    plugins: [
        new CleanWebpackPlugin([path.resolve(__dirname, '../dist')], { root }),
        new HtmlWebpackIncludeAssetsPlugin({
            assets: [
                // libs should be loaded via cdn
                // moment
                'https://cdn.jsdelivr.net/npm/moment@2.22.2/moment.min.js',
                'https://cdn.jsdelivr.net/npm/moment@2.22.2/locale/zh-cn.min.js',
                // perfect-scrollbar
                'https://cdn.jsdelivr.net/npm/perfect-scrollbar@1.4.0/dist/perfect-scrollbar.min.js',
                'https://cdn.jsdelivr.net/npm/perfect-scrollbar@1.4.0/css/perfect-scrollbar.min.css',
                // vue libs
                'https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.min.js',
                'https://cdn.jsdelivr.net/npm/vue-router@3.0.1/dist/vue-router.min.js',
                'https://cdn.jsdelivr.net/npm/vuex@3.0.1/dist/vuex.min.js',
                // element-ui
                'https://cdn.jsdelivr.net/npm/element-ui@2.4.8/lib/index.js',
                'https://cdn.jsdelivr.net/npm/element-ui@2.4.8/lib/theme-chalk/index.css',
                // socket.io
                'https://cdn.jsdelivr.net/npm/socket.io-client@2.1.1/dist/socket.io.js'
            ],
            append: false
        }),
        ...styleOptions.plugins
    ]
})
module.exports = prodConfig
