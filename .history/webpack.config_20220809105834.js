const path = require('path')

module.exports = {
  entry: './src/index',
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './dist'),
  },
  rules: [
    {
      test: /\.js$/,
      use: ['babel-loader'],
    },
  ],
}
