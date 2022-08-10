const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')

console.log('env', process.env.NODE_ENV)

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
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [new MiniCssExtractPlugin(), new HTMLWebpackPlugin()],
}
