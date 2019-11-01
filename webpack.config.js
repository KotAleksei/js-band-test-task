const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let conf = {
  entry: {
    main: ['./src/js/index.js', './src/scss/style.scss'],
  }, 
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
    publicPath: 'dist/'
  },
  devServer: {
    compress: true,
    port: 8080
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })
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
                require('cssnano')({
                  preset: 'default',
                })
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