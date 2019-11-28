const path = require("path")
const webpack = require("webpack")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const resolve = dir => path.resolve(__dirname, dir)

module.exports = {
  // 入口js路径
  entry: {
    index: "./src/views/index/index.js"
  },
  // 方便追踪源代码错误
  // devtool: "source-map",
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    // 自动清空dist目录
    new CleanWebpackPlugin(),
    // 设置html模板生成路径
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/views/index/index.html",
      chunks: ["styles", "common", "jquery", "index"]
    }),
    new HtmlWebpackPlugin({
      filename: "login.html",
      template: "./src/views/login/index.html",
      chunks: ["login"]
    }),
    new CopyWebpackPlugin([{ from: "./src/static", to: "static" }]),
    // 分离样式到css文件
    new MiniCssExtractPlugin({
      filename: "css/[name].css"
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /jquery/,
          name: "jquery",
          chunks: "all"
        }
      }
    }
  },
  // 编译输出配置
  output: {
    // js生成到dist/js，[name]表示保留原js文件名
    filename: "js/[name].js",
    // 输出路径为dist
    path: path.resolve(__dirname, "dist")
  },
  resolve: {
    // 设置别名
    alias: {
      "@": resolve("src") // 这样配置后 @ 可以指向 src 目录
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 5000
            },
            options: {
              publicPath: "/"
            }
          }
        ]
      }
    ]
  },
  devServer: {
    host: "0.0.0.0",
    open: true
  }
}
