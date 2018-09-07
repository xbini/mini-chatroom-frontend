const path = require('path')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const commonConfig = require('./webpack.common.config')

const root = path.resolve(__dirname, '../')
const prodConfig = merge(commonConfig, {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin([path.resolve(__dirname, '../dist')], { root }),
    ]
})
module.exports = prodConfig
