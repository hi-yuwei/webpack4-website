const path = require("path")
const webpack = require("webpack")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const os = require("os")

/* 获取本机IP */
function getNetworkIp() {
  let needHost = "" // 打开的host
  try {
    // 获得网络接口列表
    let network = os.networkInterfaces()
    for (let dev in network) {
      let iface = network[dev]
      for (let i = 0; i < iface.length; i++) {
        let alias = iface[i]
        if (alias.family === "IPv4" && alias.address !== "127.0.0.1" && !alias.internal) {
          needHost = alias.address
        }
      }
    }
  } catch (e) {
    needHost = "localhost"
  }
  return needHost
}

module.exports = {
  // 入口js路径
  entry: {
    index: "./src/views/index/index.js"
  },
  // 编译输出配置
  output: {
    // js生成到dist/js，[name]表示保留原js文件名
    filename: "js/[name].js",
    // 输出路径为dist
    path: path.resolve(__dirname, "dist")
  },
  //开发环境
  devServer: {
    host: getNetworkIp(),
    open: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
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
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
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
  resolve: {
    // 设置别名
    alias: {
      "@": path.resolve(__dirname, "src") // 这样配置后 @ 可以指向 src 目录
    }
  },
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
      chunks: ["jquery", "index"]
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
  ]
}
