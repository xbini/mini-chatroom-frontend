// todo: MiniCssExtractPlugin is not support HMR now
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = (extra = false) => {
    const loader = extra ? MiniCssExtractPlugin.loader : 'style-loader'
    const plugins = extra ? [new MiniCssExtractPlugin({
        filename: '[name].css'
    })] : []
    return {
        loaders: [
            {
                test: /\.css$/,
                include: path.resolve(__dirname, '../src'),
                use: [loader, 'css-loader', 'postcss-loader']
            },
            {
                test: /\.scss$/,
                include: path.resolve(__dirname, '../src'),
                use: [loader, 'css-loader', 'postcss-loader', 'sass-loader']
            }
        ],
        plugins
    }
}
