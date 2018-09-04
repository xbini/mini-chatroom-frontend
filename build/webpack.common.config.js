const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const root = path.resolve(__dirname, '../')
const commonConfig = {
    target: 'web',
    cache: true,
    mode: 'development',
    devtool: 'source-map',
    // externals: ['vue', 'vue-router'],
    context: root,
    entry: {
        polyfill: './src/polyfill.js',
        main: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        // todo: webpack@4.17.2这个版本, chunkFilename还有bug
        chunkFilename: '[name].js'
    },
    resolve: {
        extensions: ['.vue', '.js', '.scss', '.css', '.html'],
        alias: {
            vue$: 'vue/dist/vue.esm.js'
        }
    },
    optimization: {
        runtimeChunk: {
            name: 'runtime'
        },
        splitChunks: {
            chunks: 'all',
            minChunks: 2
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: 'css-loader'
            },
            {
                test: /\.scss$/,
                use: 'sass-loader'
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 2048
                    }
                }
            },
            {
                test: /\.woff|\.woff2|\.svg|\.eot|\.ttf/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 2048
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin([path.resolve(__dirname, '../dist')], { root }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
            favicon: path.resolve(__dirname, '../favicon.png'),
            hash: true
        }),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../src/assets'),
            to: path.resolve(__dirname, '../dist/assets')
        }])
    ]
}
module.exports = commonConfig
