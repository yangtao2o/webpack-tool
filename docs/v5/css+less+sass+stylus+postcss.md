# 使用预处理器、PostCSS 等构建 CSS 工程环境

介绍 css-loader、style-loader、mini-css-extract-plugin、less-loader、postcss-loader 等组件的功能特点与接入方法，内容有点多，重点在于：

- Webpack 不能理解 CSS 代码，所以需要使用 css-loader、style-loader、mini-css-extract-plugin 三种组件处理样式资源；
- Less/Sass/Stylus/PostCSS 等工具可弥补原生 CSS 语言层面的诸多功能缺失，例如数值运算、嵌套、代码复用等。

## Loader

- css-loader：该 Loader 会将 CSS 等价翻译为形如 `module.exports = "${css}"` 的 JavaScript 代码，使得 Webpack 能够如同处理 JS 代码一样解析 CSS 内容与资源依赖；
- style-loader：该 Loader 将在产物中注入一系列 runtime 代码，这些代码会将 CSS 内容注入到页面的 `<style>` 标签，使得样式生效；
- mini-css-extract-plugin：该插件会将 CSS 代码抽离到单独的 .css 文件，并将文件通过 <link> 标签方式插入到页面中。
- mini-css-extract-plugin 不能与 style-loader 混用
- mini-css-extract-plugin 需要与 html-webpack-plugin 同时使用

## 下载

```sh
yarn add -D css-loader style-loader mini-css-extract-plugin

yarn add -D less less-loader

yarn add -D sass sass-loader

yarn add -D stylus stylus-loader

yarn add -D postcss postcss-loader
```

## 配置

```js
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
```

根目录下 `postcss.config.js`：

```js
module.exports = {
  plugins: [require('autoprefixer')],
}
```
