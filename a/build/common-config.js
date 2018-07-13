
let path = require('path');

let gateway = 'http://gateway.jwis.cn'
let login = 'http://login.jwis.cn'
let appkey = 'a203980c6e'

module.exports = {
  port: 80,

  domain: 'test.jwis.cn',

  assetsRoot: path.resolve(__dirname, '../dist'),
  assetsSubDirectory: 'static',

  productionSourceMap: false,
  productionGzip: false,
  productionGzipExtensions: ['js', 'css'],
  bundleAnalyzerReport: false,

  metaConf: {
    platformAppkey: 'a203980c6e',
    appkey: 'a203980c6e',
    login: 'http://login.jwis.cn',
    gateway: 'http://gateway.jwis.cn'
  }
};
