const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')

const srcDir = path.resolve(__dirname, '../src')

module.exports = {
    target: 'web',
    cache: true,
    bail: true,
    externals: {
        moment: 'moment',
        'socket.io-client': 'io',
        axios: 'axios'
    },
    stats: {
        children: false
    },
    entry: {
        main: './src/app.ts'
    },
    output: {
        pathinfo: false,
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        chunkFilename: '[name].js',
        clean: true
    },
    resolve: {
        extensions: ['.vue', '.ts', '.js', '.json', '.scss', '.css'],
        alias: {
            vue: 'vue/dist/vue.esm-bundler.js'
        }
    },
    optimization: {
        runtimeChunk: {
            name: 'runtime'
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                include: srcDir,
                use: {
                    loader: 'ts-loader',
                    options: {
                        appendTsSuffixTo: [/\.vue$/],
                    }
                }
            },
            {
                test: /\.vue$/,
                include: srcDir,
                use: 'vue-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                include: srcDir,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 4096,
                        name: '[name].[ext]',
                        outputPath: 'images'
                    }
                }
            },
            {
                test: /\.woff|\.woff2|\.svg|\.eot|\.ttf/,
                include: srcDir,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 4096,
                        name: '[name].[ext]',
                        outputPath: 'fonts'
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false
        }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
            favicon: path.resolve(__dirname, '../src/favicon.png'),
            hash: true
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, '../src/assets'),
                to: path.resolve(__dirname, '../dist/assets')
            }]
        })
    ]
}
