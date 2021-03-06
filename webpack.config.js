const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const childProcess = require("child_process");
const webpackConstants = require("./webpack.constants");
const { API_PREFIX, GOOGLE_KEY, WSP_PREFIX, OLD_WEBPANEL } = webpackConstants;
let { version } = require("./package.json");

/* Для отображения версии приложения + коммита при запуске приложения */
try {
  version = `${version} rev. ${childProcess
    .execSync("git rev-parse --short HEAD")
    .toString()
    .trim()}`;
} catch (e) {
  // Если не удалось узнать хэш текущей фиксации, игнорируем ошибку.
}

module.exports = {
  entry: ["babel-polyfill", "./src/index.js"],
  output: {
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, "dist")
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9006,
    proxy: [
      {
        path: "/",
        target: API_PREFIX,
        changeOrigin: true
      }
    ]
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, "src/"),
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/react"],
            plugins: [
              ["@babel/plugin-proposal-class-properties", { loose: true }]
            ]
          }
        }
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf|jpg|svg|png)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10 * 1024
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images"
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      Images: path.resolve(__dirname, "src/images/"),
      OneDeckCore: path.resolve(__dirname, "src/core/"),
      Map: path.resolve(__dirname, "src/modules/Map/"),
      Charts: path.resolve(__dirname, "src/modules/Charts/"),
      Root: path.resolve(__dirname, "src/modules/Root/"),
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      API_PREFIX: JSON.stringify(API_PREFIX),
      WSP_PREFIX: JSON.stringify(WSP_PREFIX),
      GOOGLE_KEY: JSON.stringify(GOOGLE_KEY),
      OLD_WEBPANEL: JSON.stringify(OLD_WEBPANEL),
      VERSION: JSON.stringify(version)
    }),
    new MiniCssExtractPlugin({
      filename: "style.[hash].css"
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: "./src/index.html",
      filename: "index.html"
    }),
    new WebpackMd5Hash(),
    new VueLoaderPlugin(),
    new CleanWebpackPlugin()
  ]
};
