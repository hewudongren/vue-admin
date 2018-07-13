/**
 * 工具箱
 * 
 * @author gill
 * @date 2018-05-08
 */

import cookie from 'jw_common/cookie'
import lodash from 'lodash'
import dayjs from 'dayjs'

Jw.dayjs = dayjs

let cascade = function(arr,idField,parentField,rootNodeValue) {
  let children = _.filter(arr,(n) => { 
    return n[parentField] === rootNodeValue 
  })
  
  _.each(children,(n) => {
    n.children = cascade(arr, idField, parentField, n[idField])
  })
  
  return children
}

export default {
  
  //https://github.com/iamkun/dayjs/blob/master/docs/zh-cn/README.zh-CN.md
  dayjs,

  cascade,
  isIE9() {
    
    return /MSIE 9.0;/.test(window.navigator.userAgent)
  },

  jumpToLogin() {

    window.location.href = `${Jw.login}/index.html?redirect_url=${window.location.href}`
  },

  download(url,query) {
    let queryArr = []
    let frmDownloadDom = document.querySelector('#frm-download')

    query = query || {}
    query.access_token = cookie.getAuth()
    _.each(query,(val,attr)=>{
      queryArr.push(`${attr}=${val}`)
    })

    frmDownloadDom.setAttribute('src', `${url}?${queryArr.join('&')}`)
    frmDownloadDom.onload = function() {
      try {
        let doc = frmDownloadDom.contentDocument? frmDownloadDom.contentDocument : frmDownloadDom.document
        let response = doc.body && doc.body.innerHTML
        let result = JSON.parse(response)
  
        if( result && result.message && result.code !== 0) {
          Vue.prototype.$error(result.message)
        }
      }catch(e) {

        console.log('download fail')
      }
    }
  },

  getUrlHash() {

    let hash = window.location.hash
    return hash.replace('#/','')
  },

  copy(value) {
    let copyState
    let input = document.createElement("input")

    input.setAttribute('value', value)
    input.setAttribute('class', 'out-of-body')

    document.body.appendChild(input)
    input.select()
    copyState = document.execCommand('copy')
    document.body.removeChild(input)
    return copyState
  },

  getPanelTitle(routePrexPath,menus) {
    let code = ''
    let title = []
    let selectedLevel1Menu = null
    let routes = routePrexPath.split('/')

    //匹配一级目录
    for(let i=0,len=menus.length;i<len;i++) {
      if(menus[i].path === `/${routes[0]}`) {
        selectedLevel1Menu = menus[i]
        title.push(menus[i].name)
        code = menus[i].code
        break  
      }
    }
    
    //匹配二级目录
    if(
      routes.length>1 && 
      selectedLevel1Menu && _.isArray(selectedLevel1Menu.children)
    ) {

      for(let j=0,jlen=selectedLevel1Menu.children.length;j<jlen;j++) {
        if(selectedLevel1Menu.children[j].path.indexOf(`/${routePrexPath}`)===0) {
          title.push(selectedLevel1Menu.children[j].name)
          code = selectedLevel1Menu.children[j].code
          break
        }
      }
    }

    return { title,code }
  }
}
