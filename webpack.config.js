const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const filename = (ext) =>  isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

module.exports = {
    mode:'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: filename('js'),
        clean: true,
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devServer: {
        port: 5000,
        hot: true,
    },
    devtool: isProd ? false : "source-map",
    plugins: [new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src/index.html"),
        filename: "index.html",
        minify: {
            collapseWhitespace: isProd,
        },
    }),
        new MiniCssExtractPlugin({
            filename: `./css/${filename("css")}`,
        }),
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: (resourcePath, context) =>
                                `${path.relative(path.dirname(resourcePath), context)}/`,
                        },
                    },
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.(png|jpg|svg|gif|jpeg)$/i,
                type: "asset/resource",
                generator: {
                    filename: `img/${filename("[ext]")}`,
                },
            },
            {
                test: /\.jsx?$/i,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
        ]
    }
}