const path = require('path')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const commonConfig = require('./webpack.common.config')
const genStyleLoaders = require('./style.loaders')

const root = path.resolve(__dirname, '../')
const prodConfig = merge(commonConfig, {
    mode: 'production',
    devtool: 'source-map',
    module: {
        rules: genStyleLoaders(true)
    },
    plugins: [
        new CleanWebpackPlugin([path.resolve(__dirname, '../dist')], { root }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ]
})
module.exports = prodConfig
