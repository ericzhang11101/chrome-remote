const path = require('path');

module.exports = {
  entry: {
    background: './src/background.js',
    content: './src/main.js',
  },
  output: {
    filename: '[name].js',
    // path: path.resolve(__dirname, '../build')
    path: __dirname + '/build/bundle'
  },
  mode: 'production',
  experiments: {
    topLevelAwait: true
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      jquery: "jquery/src/jquery"
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: 'css-loader'
      },
      {
        // Exposes jQuery for use outside Webpack build
        test: require.resolve('jquery'),
        use: [{
          loader: 'expose-loader',
          options: 'jQuery'
        },{
          loader: 'expose-loader',
          options: '$'
        }]
      }
    ]
  }
};