postcss-通过 js 对 css 进行操作，拥有丰富插件，如果 autoprefiex 就是其中一款，可以对 css 添加浏览器前缀。postcss 在项目根目录下需要创建 postcss.config.js 文件，在其中对 postcss 插件进行配置

package.json 中 browserslist 配置，为什么有些是配置这里，因为起到全局作用，如果有很多插件需要用到浏览器配置就可以放到这里，这样就不用每个文件都配置

webpack

1、mode 模式 production development

2、0 配置 src 文件夹下 index.js 默认入口，dist 文件输出文件(适用于小项目)

3、wepack.config.js 配置文件

4、production 模式会去除 console.log 等内容

6、rules 对象，通过 test 正则匹配文件并利用 Loader 对文件进行处理

5、loaders 处理源文件，默认从左到右，是从下到上

7、url-loader 将文件打包成 base64

8、plughs 插件
