const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');

module.exports = {
  mode: "production",

  output: {
    filename: 'bundle.js',
    path: __dirname + '/app'
  },

  devServer: {
    contentBase: path.join(__dirname, 'app')
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js"],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: './tsconfig.json',
        baseUrl: 'src'
      })
    ],
    modules: [path.join(__dirname, 'node_modules')]
  },

  plugins: [
    new CopyPlugin([
      './static/index.html',
      './static/styles.css'
    ]),
  ],

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  }
}