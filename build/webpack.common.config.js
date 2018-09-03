const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const commonConfig = {
    target: 'web',
    devtool: 'source-map',
    // externals: ['vue'],
    context: path.resolve(__dirname),
    entry: {
        main: '../src/main.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.vue', '.js', '.scss', '.css', '.html'],
        alias: {
            vue$: 'vue/dist/vue.esm.js'
        }
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    priority: 1,
                    name: 'vendor'
                }
            }
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
                test: /\.json$/,
                use: 'json-loader'
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
