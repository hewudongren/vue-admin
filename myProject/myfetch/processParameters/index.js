/**
 * app/app/index 表格数据接口
 * 
 * @author gill
 * @date 2018-05-02
 */

import inherit from 'jw_common/inherit'
import AbstractModel from 'jw_models/abstract'
import staticData from 'jw_common/data'

const PAGE_SIZE = staticData.tablePageSize

let AppReaditionModel = inherit(AbstractModel, {
  initialization() {
   
     this.url = `${Jw.baseUrl}/bop/technology/parameter/query/paramter`
    this.type = 'post'
    this.pageIndex = 1
    this.param={
     
    }
    // this.query = {
    //   take: PAGE_SIZE,
    //   skip: 0
    // }
  },

  dataFormat(data) {
  
    return data.data
  },

  setPageIndex(pageIndex) {

    this.pageIndex = pageIndex
  },

  execute(source) {
    //传入对象合并，传入数字类型忽略
    
    let obj=Object.assign(this.query, source);
    for (const key in obj) {
     
      if (obj[key]==""||obj[key]==null) {
        delete obj[key]
      }
    }
    this.query=obj
    //  this.query.skip = (this.pageIndex-1) * PAGE_SIZE
   
    return this.exec()
  }
})


export default new AppReaditionModel()
