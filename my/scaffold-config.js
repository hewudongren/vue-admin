export default {
  //docUrl: 'http://doc.jwis.cn/docs/index.html', 
  headerTitle: ' - DMPP',
  footerTxt: 'JWI Innovation Software(Shenzhen)Ltd.',

  //多语言配置
  languageMap: {
    'platform.app_app.permission': '',
    'platform.app_pm.treeTitle': '',
    'platform.app_pm.actionTitle': '',
    'platform.app_pm.apiTitle': '',
    'platform.common.creatorDate': '',
    'platform.app_role.role': '',
    'platform.app_role.addRole': '',
    'platform.app_profile.rights_profile': '',
    'platform.app_role.editRole': '',
    'platform.app_app.editApp': '',
    // 'platform.app_app.resourcename':''


    'bop.common.download': '',
    'bop.common.upload': '',
    'bop.process.department': '',
    'bop.process.code': '',
    'bop.process.name': '',
    'bop.process.additon': '',
    'bop.process.seq': '',
    'bop.process.cls': ''
  },

  //系统左侧导航栏配置
  asideMenu: [{
      path: '/bresources',
      code: 'bresources',
      name: '',
      nameKey: 'platform.menu.bresources',
      icon: 'icon-star',
      children: [{
          path: '/bresources/bresources/index',
          name: '',
          nameKey: 'platform.menu.bresources/bresources',
          code: 'bresources/bresources',
          icon: 'icon-star'
        },
        {
          path: '/bresources/resource',
          name: '',
          nameKey: 'platform.menu.bresources/presource',
          code: 'bresources/resource',
          icon: 'icon-star'
        },
        {
          path: '/bresources/parameters',
          name: '',
          nameKey: 'platform.menu.bresources/pparameter',
          code: 'bresources/parameters',
          icon: 'icon-star'
        },
        {
          path: '/bresources/information',
          name: '',
          nameKey: 'platform.menu.bresources/information',
          code: 'bresources/information',
          icon: 'icon-star'
        },
        {
          path: '/bresources/picture',
          name: '',
          nameKey: 'platform.menu.bresources/picture',
          code: 'bresources/picture',
          icon: 'icon-star'
        },
        {
          path: '/bresources/process',
          name: '',
          nameKey: 'platform.menu.bresources/process',
          code: 'bresources/process',
          icon: 'icon-star'
        },
        {
          path: '/bresources/describe',
          name: '',
          nameKey: 'platform.menu.bresources/describe',
          code: 'bresources/describe',
          icon: 'icon-star'
        },
        {
          path: '/bresources/deploy',
          name: '',
          nameKey: 'platform.menu.bresources/deploy',
          code: 'bresources/deploy',
          icon: 'icon-star'
        },
        {
          path: '/bresources/documents',
          name: '',
          nameKey: 'platform.menu.bresources/documents',
          code: 'bresources/documents',
          icon: 'icon-star'
        }
      ]
    }
  ]
}