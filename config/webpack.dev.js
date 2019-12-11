const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {

  entry: ['./src/js/index.js','./src/index.html'],//指定入口文件在哪里
  /*entry: {
    peiqi: './src/js/index.js'
  },*/
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './js/index.js'
  },//指定输出位置、文件名
  mode: 'development', //工作模式
  //用到的所有loader都需要配置在module对象中的rules数组中，每个loader都是一个对象。
  module: {
    rules: [
      {
        test: /\.less$/, //匹配所有less文件
        use:[
          'style-loader', // 创建style标签，添加上js中的css代码
          'css-loader', // 将css以commonjs方式整合到js文件中
          'less-loader'  // 将less文件解析成css
        ]
      }, //配置解析less
      {
        test: /\.js$/,  //只检测js文件
        exclude: /node_modules/,  //排除node_modules文件夹
        enforce: "pre",  //提前加载使用
        loader: "eslint-loader"//使用eslint-loader解析
      }, //进行js语法检查
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',  // 按需引入需要使用polyfill
                  corejs: { version: 3 }, // 解决warn
                  targets: { // 指定兼容性处理哪些浏览器
                    "chrome": "58",
                    "ie": "11",
                  }
                }
              ]
            ],
            cacheDirectory: true, // 开启babel缓存
          }
        }
      },//语法转换（es6==>es5）
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              outputPath: './imgs',// 决定文件本地输出路径
              name: '[hash:5].[ext]',// 修改文件名称 [hash:5] hash值取5位  [ext] 文件扩展名
              publicPath: '/imgs/',// 决定引入图片的路径
              limit: 8192, //只要小于8Kb的图片，转为base64
              esModule:false //解决编译后img标签图片路径问题
            },
          },
        ],
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader'
        }
      },
      {
        test: /\.(eot|svg|woff|woff2|ttf|mp3|mp4|avi)$/,  // 处理其他资源
        loader: 'file-loader',
        options: {
          outputPath: 'media',
          name: '[hash:5].[ext]'
        }
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin(
      {template: './src/index.html'}, // 以当前文件为模板创建新的HtML(1. 结构和原来一样 2. 会自动引入打包的资源)
    )
  ],
  devServer: {
    open: true, // 自动打开浏览器
    compress: true, // 启动gzip压缩
    port: 3000, // 端口号
    hot: true // 开启热模替换功能 HMR
  },
  devtool:'cheap-module-eval-source-map'
};
