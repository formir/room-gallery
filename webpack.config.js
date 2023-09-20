const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require("path");


module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';
  const isIndex = process.env.ENTRY === 'index';
  return {
    entry: {
      index: "./src/index.tsx",
      roomGallery: "./src/function.tsx",
      jQueryRoomGallery: "./src/jquery.tsx",
    },
    output: {
      path: path.join(__dirname, "docs"),
      filename: "[name].js",
      clean: true
    },
    module: {
      rules: [
        {
          test: /\.(png|jp(e*)g|gif)$/,
          type: "asset/resource",
          generator : {
            filename : 'img/[name][ext][query]',
          }
        },
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          use: [{ loader: '@svgr/webpack', options: { icon: true } }],
        },
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.s(a|c)ss$/,
          use: [
            isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[local]',
                },
                sourceMap: isDevelopment,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isDevelopment,
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx', '.scss'],
    },
    externals: {
      "jQuery": "jQuery"
    },
    target: "web",
    node: {
      __dirname: false,
    },
    stats: {
      warnings: false,
    },
    devServer: {
      static: path.join(__dirname, 'public'),
      compress: true,
      port: 3011,
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
      new MiniCssExtractPlugin({
        filename: isDevelopment ? '[name].css' : '[name].css',
        chunkFilename: isDevelopment ? '[id].css' : '[id].css',
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'public'),
            to: path.resolve(__dirname, 'docs'),
            globOptions: {
              ignore: ['*.html'],
            },
          },
        ],
      }),
    ],
  }
};
