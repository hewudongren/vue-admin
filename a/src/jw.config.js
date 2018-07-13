
import scaffoldConfig from '__{targetSystem}__/scaffold-config'
import _ from 'lodash'

export default {

  /*
   * ----系统左侧导航栏配置---
   *  1. 脚手架中默认包含四大模块，即：应用管理，微服务管理，应用配置中心，组织/用户
   *  2. 打包过程时 默认导航配置 和 业务系统导航配置 会合并到一起
   *  3. 导航配置解释：
   *        
   *        path: 路由地址，即浏览器地址栏地址
   *        name: 显示名称
   *        nameKey: name对应的多语言配置，nameKey需要在平台（platform.jwis.cn）中配置
   *        code: 导航项唯一标记, code需要在平台（platform.jwis.cn）中配置
   *        icon: 图标字体样式
   *        children: 子导航栏配置 
   * 
   *  4.关于path配置
   *      
   *     4.1 一级菜单，只能要一个单词，比如：
   *     {
   *       code: 'home',
   *       path: '/home',                  //一个单词 home
   *       name: '主页',
   *       nameKey: 'platform.app.home'
   *     }
   *     
   *     4.2 二级菜单，二级菜单path需基于一级菜单path，比如：
   *     {
   *       code: 'app',
   *       path: '/app',
   *       name: '应用',
   *       nameKey: 'platform.app.app',
   *       children:[{
   *         code: 'app/init',
   *         path: '/app/index',
   *         name: '应用列表',
   *         nameKey: 'platform.app.list'
   *       }]
   *     }
   */
  asideMenu: /*start*/[{
        path: '/app',
        name:'',
        nameKey: 'platform.menu.app',
        code: 'app/app',
        icon: 'icon-apps'
      },{
        path: '/service',
        code: 'svc/service',
        name: '',
        nameKey: 'platform.menu.svc',
        icon: 'icon-cloud'
      },{
        name: '',
        nameKey: 'platform.menu.config',
        code: 'config',
        path: '/config',
        icon: 'icon-config-rule',
        children: [{
            path: '/config/i18n',
            name: '',
            nameKey: 'platform.menu.config/i18n',
            code: 'config/i18n',
            icon: 'icon-internal'
          },{
            path: '/config/dataDictionary',
            code: 'config/dataDictionary',
            name: '',
            nameKey: 'platform.menu.config/dataDictionary',
            icon: 'icon-data-dict'
          }
        ]
      },{
        name: '',
        nameKey: 'platform.menu.sys',
        code: 'sys',
        path: '/sys',
        icon: 'icon-user-setting',
        children: [{
            path: '/sys/user/index',
            name: '',
            nameKey: 'platform.menu.sys/user',
            code: 'sys/user',
            icon: 'icon-user'
          },{
            path: '/sys/org/index',
            name: '',
            nameKey: 'platform.menu.sys/org',
            code: 'sys/org',
            icon: 'icon-institute'
          }
        ]
      }]/*end*/.concat(scaffoldConfig.asideMenu || []),
  
  /**
   * ----业务系统中配置多语言----
   * 需要在平台（platform.jwis.cn）中配置多语言
   * 
   * {
   *  'myProject.a.c': ''
   * }
   */
  languageMap: _.extend({}, scaffoldConfig.languageMap || {}),

  /**
   * ----排除无用路由---
   * 
   * 如业务系统不需要脚手架提供的 组织/用户 模块，则需要排除的路由如下：
   *  {
   *     path: '/sys/user/index',
   *     component: () => import ('./modules/sys/user/index')
   *   }, {
   *     path: '/sys/user/edit/:id',
   *     component: () => import ('./modules/sys/user/edit')
   *   }, {
   *     path: '/sys/org/index',
   *     component: () => import ('./modules/sys/org/index')
   *   }
   * 
   *  那么只需在excludeRouters中配置：
   *  [
   *   '/sys/user/index',
   *   '/sys/user/edit/:id',
   *   '/sys/org/index'
   *  ]
   *  
   *  那么Vue-router就不会注册上述路由，但是打包代码大小不会减少，因此不建议使用。
   * 
   *  如果不希望打包脚手架中 应用管理，微服务管理，应用配置中心，组织/用户 四页面模块，这样会
   *  减少打包代码量，则需配置 myProject/package-config.js中 excludeDefaultModules为true
   */
  excludeRouters: scaffoldConfig.excludeRouters || [],
  
  /**
   * ---配置系统左侧导航栏显示顺序和需要显示的导航项----
   * 
   * 如左侧导航栏配置如下：
   * asideMenu: [{
   *     path: '/app',
   *     name:'',
   *     nameKey: 'platform.menu.app',
   *     code: 'app/app',
   *     icon: 'icon-apps'
   *   },{
   *     path: '/service',
   *     code: 'svc/service',
   *     name: '',
   *     nameKey: 'platform.menu.svc',
   *     icon: 'icon-cloud'
   * }]
   * 
   * 如何设置导航项的显示顺序？？？
   * 通过配置asideMenuQueue即可，配置如下：
   *  [
   *    'svc/service',      //code
   *    'app/app'           //code
   *  ]
   * 
   * 如何移除不必要的导航项？？比喻需要移除code为 app/app 的导航项，
   * 则asideMenuQueue中不配置app/app即可。配置如下：
   *   [
   *    'svc/service'   //code
   *   ]
   * 
   *  如果asideMenuQueue为[], 那么脚手架中默认导航栏和业务系统导航栏会合并到一起，
   *  脚手架导航栏在前，业务系统导航栏在后。  
   */
  asideMenuQueue: scaffoldConfig.asideMenuQueue || [],

  //文档地址，如果需显示文档链接，则传空
  docUrl: scaffoldConfig.docUrl, 
  
  //页面底部企业标注
  footerTxt: scaffoldConfig.footerTxt,

  //页头企业title
  headerTitle: scaffoldConfig.headerTitle
}