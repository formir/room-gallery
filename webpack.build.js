const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const demoOutput = (env, argv) => {
  return {
    entry: {
      demo: {
        filename: "demo.js",
        import: "./src/demo.tsx"
      },
    },
    output: {
      path: path.join(__dirname, "docs")
    },
    module: {
      rules: [
        {
          test: /\.(png|jp(e*)g|gif)$/,
          type: "asset/resource",
          generator: {
            filename: "img/[name][ext][query]",
          }
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: ["ts-loader"],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader", "astroturf/loader"],
        },
        {
          test: /\.s(a|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: "[local]",
                },
                sourceMap: false,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      "postcss-preset-env"
                    ],
                  ],
                },
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: false,
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx", ".scss"],
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
      static: path.join(__dirname, "public"),
      compress: true,
      port: 3011,
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
      new MiniCssExtractPlugin({
        filename: "RoomGallery.css"
      })
    ]
  }
};

const pluginsOutput = (env, argv) => {
  return {
    entry: {
      jquery: {
        import: "./src/jquery.tsx",
        filename: "jQueryRoomGallery.js",
        library: {
          type: "umd",
          name: "RoomGallery",
          export: "default"
        }
      },
      RoomGallery: {
        import: "./src/RoomGallery.tsx",
        filename: "RoomGallery.js",
        library: {
          type: "umd",
          name: "RoomGallery",
          export: "default"
        }
      }
    },
    output: {
      path: path.join(__dirname, "build")
    },
    module: {
      rules: [
        {
          test: /\.(png|jp(e*)g|gif)$/,
          type: "asset/resource",
          generator: {
            filename: "img/[name][ext][query]",
          }
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: ["ts-loader"],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader", "astroturf/loader"],
        },
        {
          test: /\.s(a|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: "[local]",
                },
                sourceMap: false,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      "postcss-preset-env"
                    ],
                  ],
                },
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: false,
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx", ".scss"],
    },
    externals: {
      "jQuery": "jQuery"
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new MiniCssExtractPlugin({
        filename: "RoomGallery.css"
      })
    ]
  }
};

const cssOutput = (env, argv) => {
  return {
    entry: ["./scss/room-gallery.scss"],
    output: {
      path: path.join(__dirname, "build"),
    },
    module: {
      rules: [
        {
          test: /\.(png|jp(e*)g|gif)$/,
          type: "asset/resource",
          generator: {
            filename: "img/[name][ext][query]",
          }
        },
        {
          test: /\.s(a|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: "[local]",
                },
                sourceMap: false,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      "postcss-preset-env"
                    ],
                  ],
                },
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: false,
              },
            },
          ],
        },
      ],
    },
    
    plugins: [
      new MiniCssExtractPlugin({
        filename: "RoomGallery.css"
      })
    ]
  }
};
  
  
const jsOutput = (env, argv) => {
  return {
    entry: ["./src/index.tsx"],
    output: {
      path: path.join(__dirname, "build"),
      filename: "index.js",
      library: "RoomGallery",
      globalObject: "this",
      libraryTarget: "umd"
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: ["ts-loader"],
        }
      ],
    },
    resolve: {
      alias: {
        src: path.resolve(__dirname, "src/"),
      },
      extensions: [".tsx", ".ts"],
    },
    externals: {
      react: {
        commonjs: "react",
        commonjs2: "react",
        amd: "react",
        root: "React",
      },
      "react-dom": {
        commonjs: "react-dom",
        commonjs2: "react-dom",
        amd: "react-dom",
        root: "ReactDOM",
      },
    },
  }
};

module.exports = [demoOutput, pluginsOutput, jsOutput, cssOutput];
