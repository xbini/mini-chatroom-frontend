const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');

const generateHtmlTags = (env) => {
    return new HtmlWebpackTagsPlugin({
        prependExternals: true,
        scripts: [{
                path: 'https://unpkg.com/vue@next',
                type: 'js'
            },
            {
                path: 'https://unpkg.com/vuex@4.0.0/dist/vuex.global.js',
                type: 'js'
            },
            {
                path: 'https://unpkg.com/vue-router@4.0.5/dist/vue-router.global.js',
                type: 'js'
            }, {
                path: 'https://cdn.jsdelivr.net/npm/moment@2.29.1/moment.min.js',
                type: 'js'
            }, {
                path: 'https://cdn.jsdelivr.net/npm/socket.io-client@4.0.1/build/index.min.js',
                type: 'js'
            }, {
                path: 'https://cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js',
                type: 'js'
            }
        ]
    })
}
module.exports = generateHtmlTags;
