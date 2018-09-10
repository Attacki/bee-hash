'use strict'
require('./check-versions')()           //关于版本的操作

process.env.NODE_ENV = 'production' 

const ora = require('ora')              //加载标志
const rm = require('rimraf')            //用来删除文件和文件夹的
const path = require('path')            //操作路径
const chalk = require('chalk')          //文字颜色控制
const webpack = require('webpack')
const config = require('../config')     //获取配置运行环境
const webpackConfig = require('./webpack.prod.conf')    //生产版本的打包配置

const spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {   //删除之前打包的文件和目录，重新打包

  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
