const path = require("path")
const internalIp = require("internal-ip")
const webpack = require("webpack")
const os = require("os")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")

module.exports = {
  // 入口js路径
  entry: {
    index: ["@babel/polyfill", path.resolve(__dirname, "./src/views/index/index.js")],
    productService: ["@babel/polyfill", path.resolve(__dirname, "./src/views/productService/index.js")],
    aboutUs: ["@babel/polyfill", path.resolve(__dirname, "./src/views/aboutUs/index.js")],
    contactUs: ["@babel/polyfill", path.resolve(__dirname, "./src/views/contactUs/index.js")]
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
    host: internalIp.v4.sync(),
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
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },

  /* 优化项 */
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          test: /common/,
          name: "common",
          chunks: "all"
        },
        jquery: {
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
      "@": path.resolve(__dirname, "src"), // 这样配置后 @ 可以指向 src 目录
      swiperJS: "swiper/js/swiper.js"
    }
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),

    // 自动清空dist目录
    new CleanWebpackPlugin(),
    // 复制静态资源
    new CopyWebpackPlugin([{ from: "./src/static", to: "static" }]),
    // 分离样式到css文件
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash:8].css"
    }),
    new webpack.DefinePlugin({
      SERVICE_URL: JSON.stringify("http://dev.example.com")
    }),

    // 设置html模板生成路径
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "./src/views/index/index.ejs"),
      favicon: path.resolve(__dirname, "./src/static/favicon.ico"),
      minify: { collapseWhitespace: true, removeComments: true },
      chunks: ["jquery", "common", "index"]
    }),
    new HtmlWebpackPlugin({
      filename: "productService.html",
      template: path.resolve(__dirname, "./src/views/productService/index.ejs"),
      chunks: ["jquery", "productService"]
    }),
    new HtmlWebpackPlugin({
      filename: "aboutUs.html",
      template: path.resolve(__dirname, "./src/views/aboutUs/index.ejs"),
      chunks: ["jquery", "aboutUs"]
    }),
    new HtmlWebpackPlugin({
      filename: "contactUs.html",
      template: path.resolve(__dirname, "./src/views/contactUs/index.ejs"),
      chunks: ["jquery", "contactUs"]
    })
  ]
}
