/* eslint-disable*/

const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')

const getStyleLoader = () => {
  return process.env.NODE_ENV === 'development'
    ? 'style-loader'
    : MiniCssExtractPlugin.loader
}

module.exports = {
  entry: './src/index',
  mode: 'development',
  devtool: false,
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './dist'),
    assetModuleFilename: 'images/[hash][ext][query]',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/i,
        use: [
          getStyleLoader(),
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1, //当css-loader遇到@import语法时
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [getStyleLoader(), 'css-loader', 'postcss-loader', 'less-loader'],
      },
      {
        test: /\.s(a|c)ss$/,
        use: [getStyleLoader(), 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.styl$/,
        use: [getStyleLoader(), 'css-loader', 'stylus-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        type: 'asset/resource',
        // use: [
        //   {
        //     loader: 'image-webpack-loader',
        //     options: {
        //       disable: process.env.NODE_ENV === 'development',
        //       // jpeg 压缩配置
        //       mozjpeg: {
        //         quality: 80,
        //       },
        //     },
        //   },
        // ],
      },
      // {
      //   test: /\.(png|jpg|gif)$/,
      //   type: 'asset/inline',
      //   parser: {
      //     dataUrlCondition: {
      //       maxSize: 1024,
      //     },
      //   },
      // },
      {
        test: /\.svg$/i,
        type: 'asset/inline',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [new MiniCssExtractPlugin(), new HTMLWebpackPlugin()],
}
