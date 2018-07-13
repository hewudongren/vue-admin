
module.exports = {
  //输出别名
  package: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        myfetch: 'bop-client/myfetch',
        components: 'bop-client/mycomponent',
        assets: 'bop-client/assets',
        models: 'bop-client/models',
       
        stores: 'bop-client/stores',
        common: 'bop-client/common',
        modules: 'bop-client/modules'
      }
    }
  },
  // 请求接口，配置全局变量
  metaConf: {
    appkey: '1ef836f98c',

    // baseUrl: 'http://192.168.1.166:13001'  // Jw.baseUrl,配置全局变量，家勇
    baseUrl: 'http://192.168.1.166:13002'  // Jw.baseUrl,配置全局变量，罗灵
  },

  title: 'DMPP Cloud Platform',
  port: 80,
  domain: 'test.jwis.cn',

  excludeDefaultModules: true
}