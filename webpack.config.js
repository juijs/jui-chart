const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const isProd = (process.env.NODE_ENV === 'production')
const appName = process.env['npm_config_name'] || 'app'

const config_dev = {
    context: path.resolve(__dirname, 'js'),
    entry: {
        app: path.resolve(__dirname, 'sample-webpack/' + appName + '.js'),
        vendor: path.resolve(__dirname, 'conf/webpack.js'),
    },
    output: {
        path: path.resolve(__dirname, 'out'),
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
    },
    module: {
        rules: [{
            test: /\.js$/,
            include: path.resolve(__dirname, 'js'),
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['es2015', {modules: false}]
                    ]
                }
            }]
        }]
    },
    devServer: {
        hot: false,
        inline: true,
        contentBase: path.resolve(__dirname, 'out'),
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vender',
            path: path.resolve(__dirname, 'out'),
            minChunks: Infinity
        }),

        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'sample-webpack/template.html'),
            filename: path.resolve(__dirname, 'out/index.html'),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
            }
        })
    ]
}

const config_prod = {
    context: path.resolve(__dirname, 'js'),
    entry: path.resolve(__dirname, 'conf/webpack.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'chart.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            include: path.resolve(__dirname, 'js'),
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['es2015', {modules: false}]
                    ]
                }
            }]
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
            },
        })
    ]
}

module.exports = (isProd) ? config_prod : config_dev