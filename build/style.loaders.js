// todo: MiniCssExtractPlugin is not support HMR now
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (extra = false) => {
    const loader = extra ? MiniCssExtractPlugin.loader : 'style-loader'
    return [
        {
            test: /\.css$/,
            use: [loader, 'css-loader', 'postcss-loader']
        },
        {
            test: /\.scss$/,
            use: [loader, 'css-loader', 'postcss-loader', 'sass-loader']
        }
    ]
}
