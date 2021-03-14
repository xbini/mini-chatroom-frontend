const path = require('path')

module.exports = (extra = false) => {

    return {
        loaders: [
            {
                test: /\.scss$/,
                include: path.resolve(__dirname, '../src'),
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
}
