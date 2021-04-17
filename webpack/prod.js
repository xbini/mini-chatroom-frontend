const commonConfig = require('./common')
const genStyleLoadersAndPlugins = require('./style.loaders')
const generateHtmlTags = require('./external')

const styleOptions = genStyleLoadersAndPlugins(true)

const prodConfig = commonConfig
prodConfig.mode = 'production'
prodConfig.devtool = 'source-map'
prodConfig.performance = {
    hints: 'error'
}
prodConfig.module.rules.push(...styleOptions.loaders)
prodConfig.plugins.push(generateHtmlTags(prodConfig.mode))

module.exports = prodConfig
