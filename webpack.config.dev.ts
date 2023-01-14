import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { VueLoaderPlugin } from 'vue-loader';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin'; 
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
module.exports = {
    entry: './index.ts',
    output: {
        filename: 'service.min.js',
        path: path.resolve(__dirname, 'build'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/, //已作为js扩展名这样类型的文件
                exclude: /node_modules/, //排除node_modules文件夹 
                loader: 'babel-loader',
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/,
                options: {   //新增
                    esModule: true,
                }
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {   //新增
                    appendTsSuffixTo: [/\.vue$/]
                }
            },
            {
                test: /\.css$/,
                use: [
                    // 'style-loader', 
                    'css-loader'
                ]
            },
            {
                test: /\.less$/i,
                use: [
                    // compiles Less to CSS
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        // 小于 8KB的图片会被Base64 处理
                        maxSize: 60*1024
                    }
                }
            },
        ],
    },
    target: ['web', 'es5'],
    devtool: 'inline-source-map',
    mode: 'development',
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias : {
            '@': path.resolve(__dirname,'src')
        },
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: 'body'
        }),
        new VueLoaderPlugin(),
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, 'public'),
                to: path.resolve(__dirname, 'dist/public')
            }],
        }),
        new MiniCssExtractPlugin({
            filename: 'service.min.css',
            chunkFilename: '[id].min.css'
        }),
        new TerserPlugin({ test: /\.js$/})
    ],
    performance: {
        hints: 'warning', // 枚举 false关闭
        maxEntrypointSize: 100000000, // 最大入口文件大小
        maxAssetSize: 100000000, // 最大资源文件大小
        assetFilter: function (assetFilename: any) { //只给出js文件的性能提示
            return assetFilename.endsWith('.js');
        }
    },
    optimization : {
        minimize: true,
        minimizer : [
            new CssMinimizerPlugin(),
        ]
    },
}