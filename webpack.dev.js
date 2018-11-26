const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        chart: path.resolve(__dirname, 'bundles', 'index.js')
    },
    output: {
        path: path.resolve(__dirname, 'out'),
        filename: '[name].js',
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: [ 'env' ]
                }
            }]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'bundles', 'index.html'),
            filename: path.resolve(__dirname, 'out', 'index.html'),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
            }
        })
    ],
    devServer: {
        port: 3000,
        inline: true,
        hot: false,
        open: true,
        contentBase: path.resolve(__dirname, 'out'),
        watchContentBase: true
    }
}