const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: __dirname + '/index.js',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './static',
        hot: true
    },
    plugins: [
        new CleanWebpackPlugin(['static']),
        new HtmlWebpackPlugin({
            title: 'HMR',
            template: path.resolve(__dirname, './index.html'),
            filename: 'index.html'
        }),
        //new webpack.NameModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    output: {
        path: __dirname + '/static',
        filename: '[name].js'
    },
    resolve: {alias: {'vue': 'vue/dist/vue.js'}},
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.vue$/,
                use: [
                    'vue-loader'
                ]
            },
            {
                test: /(\.jsx|\.js)$/,
                loader: 'babel-loader',
            },
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
        ]
    }
}
