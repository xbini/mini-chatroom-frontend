const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')

const root = path.resolve(__dirname, '../')
const commonConfig = {
    target: 'web',
    cache: true,
    bail: true,
    devtool: 'cheap-module-eval-source-map',
    // 不打包比较稳定的依赖库，便于浏览器缓存，加快访问速度
    // 说明：https://webpack.docschina.org/configuration/externals/#externals
    externals: {
        moment: 'moment',
        vue: 'Vue',
        'vue-router': 'VueRouter',
        vuex: 'Vuex',
        'element-ui': 'ELEMENT',
        'socket.io-client': 'io',
        axios: 'axios',
        'perfect-scrollbar': 'PerfectScrollbar'
    },
    context: root,
    stats: {
        children: false
    },
    entry: {
        main: './src/main.js'
    },
    output: {
        pathinfo: false,
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
        noEmitOnErrors: true,
        runtimeChunk: {
            name: 'runtime'
        },
        // splitChunks: {
        //     chunks(chunk) {
        //         // exclude `polyfill`
        //         return chunk.name && chunk.name.includes('polyfill') === false
        //     }
        // }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, '../src'),
                use: [
                    'babel-loader',
                    'eslint-loader'
                ]
            },
            {
                test: /\.vue$/,
                include: path.resolve(__dirname, '../src'),
                use: [
                    'vue-loader',
                    'eslint-loader'
                ]
            },
            {
                test: /\.html$/,
                include: path.resolve(__dirname, '../src'),
                use: 'html-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                include: path.resolve(__dirname, '../src'),
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
                include: path.resolve(__dirname, '../src'),
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
            favicon: path.resolve(__dirname, '../favicon.png'),
            hash: true
        }),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../src/assets'),
            to: path.resolve(__dirname, '../dist/assets')
        }]),
        new StyleLintPlugin({
            syntax: 'scss'
        })
    ]
}
module.exports = commonConfig
