# Babel+TS+ESLint 构建 JS 工程环境

## Babel

- babel-preset-react：包含 React 常用插件的规则集，支持 preset-flow、syntax-jsx、transform-react-jsx 等；
- @babel/preset-typescript：用于转译 TypeScript 代码的规则集
- @babel/preset-flow：用于转译 Flow 代码的规则集

```sh
npm i -D @babel/core @babel/preset-env babel-loader
```

```js
module.exports = {
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
    ],
  },
}
```

## TypeScript

```sh
npm i -D typescript ts-loader
```

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
}
```

创建 tsconfig.json 配置文件，并补充 TypeScript 配置信息:

```json
{
  "compilerOptions": {
    "noImplicitAny": true,
    "moduleResolution": "node"
  }
}
```

注意，如果项目中已经使用 babel-loader，你也可以选择使用 `@babel/preset-typescript` 规则集，借助 babel-loader 完成 JavaScript 与 TypeScript 的转码工作。

## ESLint

```sh
yarn add -D eslint eslint-webpack-plugin

# 使用 standard 规范
yarn add -D eslint-config-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node eslint-plugin-n
```

在项目根目录添加 `.eslintrc` 配置文件:

```json
{
  "extends": "standard"
}
```

```js
const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = {
  entry: './src/index',
  mode: 'development',
  devtool: false,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  // 添加 eslint-webpack-plugin 插件实例
  plugins: [new ESLintPlugin()],
}
```

第三方扩展：

- eslint-config-airbnb：Airbnb 提供的代码风格规则集，算得上 ESLint 生态第一个成名的规则集合
- eslint-config-standard：Standard.js 代码风格规则集，史上最便捷的统一代码风格的方式
- eslint-plugin-vue：实现对 Vue SFC 文件的代码风格检查
- eslint-plugin-react：实现对 React 代码风格检查
- @typescript-eslint/eslint-plugin：实现对 TypeScript 代码风格检查
- eslint-plugin-sonarjs：基于 Sonar 的代码质量检查工具，提供圈复杂度、代码重复率等检测功能

## 综合实现

```sh
npm i -D webpack webpack-cli \
    # babel 依赖
    @babel/core @babel/cli @babel/preset-env babel-loader \
    # TypeScript 依赖
    typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin \
    @babel/preset-typescript \
    # ESLint 依赖
    eslint eslint-webpack-plugin
```

```js
const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  devtool: false,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-typescript'] },
        },
      },
    ],
  },
  plugins: [new ESLintPlugin({ extensions: ['.js', '.ts'] })],
}
```

创建 .eslintrc 文件并输入:

```json
{
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "extends": ["plugin:@typescript-eslint/recommended"]
}
```
