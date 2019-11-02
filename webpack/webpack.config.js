const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const conf = {
  entry: {
    main: [
      './src/js/index.js',
      './src/scss/style.scss',
    ],
  }, 
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: '[name].js'
  },
  devServer: {
    port: 8080
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }
      },
      {
        test: /\.(sa|sc)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              ident: 'postcss',
              plugins: [
                require('autoprefixer'),
                require('cssnano')
              ]
            }
          },
          "sass-loader"
        ],
      },
    ]
  }
};

module.exports = (env, options) => {
  
  let production = options.mode === 'production';
  conf.devtool = production ? false : 'eval-sourcemap';
  return conf;
}