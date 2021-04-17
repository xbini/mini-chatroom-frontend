const path = require('path')
const config = require('../config.json')
const commonConfig = require('./common')
const genStyleLoadersAndPlugins = require('./style.loaders')
const generateHtmlTags = require('./external')
const styleOptions = genStyleLoadersAndPlugins(true)

const devConfig = commonConfig
devConfig.mode = 'development'
devConfig.devtool = 'inline-source-map'
devConfig.module.rules.push(...styleOptions.loaders)
devConfig.plugins.push(generateHtmlTags(devConfig.mode))

devConfig.devServer = {
    contentBase: path.resolve(__dirname, '../dist/'),
    stats: {
        children: false
    },
    proxy: [
        {
            context: ['/api/', '/socket/'],
            target: config.server.api,
            changeOrigin: true,
            secure: false
        }
    ],
    overlay: true,
    clientLogLevel: 'info',
    disableHostCheck: true,
    compress: true,
    port: 1500,
    host: '0.0.0.0',
    open: true,
    headers: {
    },
    useLocalIp: true,
    historyApiFallback: {
        rewrites: [
            { from: /./, to: '/index.html' }
        ]
    }
}
module.exports = devConfig
