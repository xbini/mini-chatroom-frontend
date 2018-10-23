const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const root = path.resolve(__dirname, '../')
const commonConfig = {
    target: 'web',
    cache: true,
    devtool: 'cheap-module-eval-source-map',
    externals: {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        vuex: 'Vuex',
        moment: 'moment',
        'element-ui': 'ELEMENT',
        'socket.io-client': 'io'
    },
    context: root,
    stats: {
        children: false
    },
    entry: {
        polyfill: './src/polyfill.js',
        main: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    resolve: {
        extensions: ['.vue', '.js', '.json', '.scss', '.css', '.html'],
        alias: {
            vue$: 'vue/dist/vue.esm.js'
        }
    },
    optimization: {
        runtimeChunk: {
            name: 'runtime'
        },
        splitChunks: {
            chunks(chunk) {
                // exclude `polyfill`
                return chunk.name && chunk.name.includes('polyfill') === false
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
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 2048,
                        name: '[name].[ext]',
                        outputPath: 'images'
                        // cdn 前缀
                        // publicPath
                    }
                }
            },
            {
                test: /\.woff|\.woff2|\.svg|\.eot|\.ttf/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 2048,
                        name: '[name].[ext]',
                        outputPath: 'fonts'
                        // cdn 前缀
                        // publicPath
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
            favicon: path.resolve(__dirname, '../favicon.jpg'),
            hash: true,
            title: 'Vue start'
        }),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../src/assets'),
            to: path.resolve(__dirname, '../dist/assets')
        }])
    ]
}
module.exports = commonConfig
