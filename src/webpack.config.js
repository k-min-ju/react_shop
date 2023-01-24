const path = require('path');

// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    entry: {
        main: path.resolve(__dirname, 'src/index.js') // 진입점
    },
    output: {
        // 번들링된 산출물의 경로와 번들링 파일 이름
        path: path.resolve(__dirname, './dist'),
        filename: 'index.bundle.js'
    },
    resolve: {
        alias: {
            components: path.resolve(__dirname, 'src'),
        },
        extensions: ['.js', '.jsx'],
    },
    module: {
        // loader 설정
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.jfif$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                }
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html', // 번들링된 js 소스가 index.html 템플릿에 들어가게 됨
        }),
    ],
    devServer: {
        // webpack-dev-server 설정
        host: 'localhost',
        port: 3000,
        hot: true, // 모듈이 수정되면 자동 리로링
        historyApiFallback: true,
    },
    devtool: 'eval-cheap-source-map', // 번들링된 소스와 원본 소스를 매핑해준다. 추적하기 쉬워서 디버깅이 원활해진다.
};