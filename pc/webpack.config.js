const resolve = require('path').resolve
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const url = require('url')
const publicPath = ''
const Prerender = require('prerender-spa-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = (options = {}) => ({
  // mode: 'production',
  entry: {
    vendor: './src/vendor',
    index: './src/main.js'
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: options.dev ? '[name].js' : '[name].js?[chunkhash]',
    chunkFilename: '[id].js?[chunkhash]',
    publicPath: options.dev ? '/assets/' : publicPath
  },
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {loaders:{
            css: ExtractTextPlugin.extract({
                use: 'css-loader',
                fallback: 'vue-style-loader'
            })
        }}
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      // {
      //   test: /\.css$/,
      //   use: ['style-loader', 'css-loader', 'postcss-loader']
      // },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: "css-loader"
        })
      },
      {
        test: /\.sass$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { sourceMap: true, modules: true, localIdentName: '[local]_[hash:base64:5]'} },
          { loader: 'postcss-loader', options: { sourceMap: true, config: { path: 'postcss.config.js' }}},
          { loader: 'sass-loader', options: { sourceMap: true } }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1000,
            name:'/dist/img/[name].[ext]'
          }
        }]
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new ExtractTextPlugin("[name].[contenthash:8].css"),
    new Prerender(
      //将渲染的文件放到dist目录下
      resolve(__dirname, 'dist'),   
      //需要预渲染的路由信息
      [ '/','/hash/0'],
      {
      //在一定时间后再捕获页面信息，使得页面数据信息加载完成
        captureAfterTime: 10000,
        //忽略打包错误
        ignoreJSErrors: true,
        phantomOptions: '--web-security=false',
        maxAttempts: 10,
      }
    ),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src')
    },
    extensions: ['.js', '.vue', '.json', '.css']
  },
  devServer: { // 测试时服务器端口
    host: '192.168.199.114',
    port: 8010,
    proxy: {
      '/shop/*': {
        target: 'http://www.hashratezz.com/',
        secure: false,
        changeOrigin: true,
        // pathRewrite: {
        //   '^/shop': ''
        // 
      },
      '/ajaxLogin': {
        target: 'http://www.hashratezz.com',
        changeOrigin: true,
        secure: false,
      },
      '/isCheck': {
        target: 'http://www.hashratezz.com',
        changeOrigin: true,
        secure: false
      },
      '/sendLoginCode': {
        target: 'http://www.hashratezz.com',
        changeOrigin: true,
        secure: false
      },
      '/ajaxRegister': {
        target: 'http://www.hashratezz.com',
        changeOrigin: true,
        secure: false
      },
      '/logout': {
        target: 'http://www.hashratezz.com',
        changeOrigin: true,
        secure: false
      },
      '/order/*': {
        target: 'http://www.hashratezz.com',
        changeOrigin: true,
        secure: false
      },
      '/getCaptcha': {
        target: 'http://www.hashratezz.com',
        changeOrigin: true,
        secure: false
      },
      '/alipay/*': {
        target: 'http://www.hashratezz.com',
        changeOrigin: true,
        secure: false
      },
      '/u/*':{
        target: 'http://www.hashratezz.com',
        changeOrigin: true,
        secure: false
      },
      '/dist/*':{
        target:'http://www.hashratezz.com',
        changeOrigin:true,
        secure:false
      },
      '/wallet/*':{
        target:'http://www.hashratezz.com',
        changeOrigin:true,
        secure:false
      },
      '/set/*':{
        target:'http://www.hashratezz.com',
        changeOrigin:true,
        secure:false
      },
      '/image/*':{
        target:'http://www.hashratezz.com',
        changeOrigin:true,
        secure:false
      },
      '/getchangePassword':{
        target:'http://www.hashratezz.com',
        changeOrigin:true,
        secure:false
      },
      '/sendChangeCode':{
        target:'http://www.hashratezz.com',
        changeOrigin:true,
        secure:false
      },
      '/changePassword':{
        target:'http://www.hashratezz.com',
        changeOrigin:true,
        secure:false
      },
      '/resetPassword':{
        target:'http://www.hashratezz.com',
        changeOrigin:true,
        secure:false
      },
      '/weixinpay/*':{
        target:'http://www.hashratezz.com',
        changeOrigin:true,
        secure:false
      }

    },
    historyApiFallback: {
      index: url.parse(options.dev ? '/assets/' : publicPath).pathname
    },
    open:true
  },
  // devtool: options.dev ? '#eval-source-map' : '#source-map'
})
