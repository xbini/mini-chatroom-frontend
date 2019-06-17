const merge = require('webpack-merge')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const commonConfig = require('./webpack.common.config')
const genStyleLoadersAndPlugins = require('./style.loaders')

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
        new CleanWebpackPlugin(),
        new HtmlWebpackIncludeAssetsPlugin({
            assets: [
                // libs should be loaded via cdn
                // moment
                'https://cdn.jsdelivr.net/npm/moment/moment.min.js',
                'https://cdn.jsdelivr.net/npm/moment/locale/zh-cn.min.js',
                // perfect-scrollbar
                'https://cdn.jsdelivr.net/npm/perfect-scrollbar/dist/perfect-scrollbar.min.js',
                'https://cdn.jsdelivr.net/npm/perfect-scrollbar/css/perfect-scrollbar.min.css',
                // vue libs
                'https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js',
                'https://cdn.jsdelivr.net/npm/vue-router/dist/vue-router.min.js',
                'https://cdn.jsdelivr.net/npm/vuex/dist/vuex.min.js',
                // element-ui
                'https://cdn.jsdelivr.net/npm/element-ui/lib/index.js',
                'https://cdn.jsdelivr.net/npm/element-ui/lib/theme-chalk/index.css',
                // socket.io
                'https://cdn.jsdelivr.net/npm/socket.io-client/dist/socket.io.js',
                // axios
                'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js'
            ],
            append: false
        }),
        ...styleOptions.plugins
    ]
})
module.exports = prodConfig
