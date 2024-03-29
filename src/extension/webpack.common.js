module.exports = {
  entry: {
    background: './background.js',
    content: './main.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/../../build/bundle',
  },
  mode: 'production',
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
        include: [
           /extension/
        ]
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
  },
  devtool: 'inline-source-map'
};