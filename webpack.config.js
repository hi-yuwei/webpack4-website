const path = require("path")
const webpack = require("webpack")
const os = require("os")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")

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
    index: "./src/views/index/index.js",
    productService: "./src/views/productService/index.js",
    aboutUs: "./src/views/aboutUs/index.js",
    contactUs: "./src/views/contactUs/index.js"
  },

  // 编译输出配置
  output: {
    publicPath: "/",
    // js生成到dist/js，[name]表示保留原js文件名
    filename: "js/[name].[hash:8].js",
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
        test: /\.ejs/,
        use: ["ejs-loader"]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
      },
      {
        test: /\.(html)$/,
        use: {
          loader: "html-loader",
          options: {
            attrs: ["img:src"]
          }
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1024 * 5,
              name: "[name]-[hash:8].[ext]",
              outputPath: "images/" //指定放置目标文件的文件系统路径
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/transform-runtime"]
          }
        }
      }
    ]
  },

  /* 优化项 */
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
    // minimizer: [new UglifyJsPlugin({ cache: true, parallel: true, sourceMap: true }), new OptimizeCssAssetsPlugin()]
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
      template: "./src/views/index/index.ejs",
      minify: { collapseWhitespace: true, removeComments: true },
      chunks: ["jquery", "index"]
    }),
    new HtmlWebpackPlugin({
      filename: "productService.html",
      template: "./src/views/productService/index.ejs",
      chunks: ["jquery", "index", "productService"]
    }),
    new HtmlWebpackPlugin({
      filename: "aboutUs.html",
      template: "./src/views/aboutUs/index.ejs",
      chunks: ["jquery", "index", "aboutUs"]
    }),
    new HtmlWebpackPlugin({
      filename: "contactUs.html",
      template: "./src/views/contactUs/index.ejs",
      chunks: ["jquery", "index", "contactUs"]
    }),

    new CopyWebpackPlugin([{ from: "./src/static", to: "static" }]),
    // 分离样式到css文件
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash:8].css"
    }),
    new webpack.DefinePlugin({
      SERVICE_URL: JSON.stringify("http://dev.example.com")
    })
  ]
}
