const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');

const generateHtmlTags = (env) => {
    const scriptsByEnv = {
        development: [
            'https://cdn.jsdelivr.net/npm/moment@2.29.1/moment.js',
            'https://cdn.jsdelivr.net/npm/socket.io-client@4.0.1/dist/socket.io.js',
            'https://cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.js'
        ],
        production: [
            'https://cdn.jsdelivr.net/npm/moment@2.29.1/moment.min.js',
            'https://cdn.jsdelivr.net/npm/socket.io-client@4.0.1/dist/socket.io.min.js',
            'https://cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js'
        ]
    }
    const linksByEnv = {
        development: [
            'https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/css/bootstrap.css'
        ],
        production: [
            'https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/css/bootstrap.min.css'
        ]
    }
    return new HtmlWebpackTagsPlugin({
        append: false,
        prependExternals: false,
        scripts: scriptsByEnv[env],
        links: linksByEnv[env]
    })
}
module.exports = generateHtmlTags;
