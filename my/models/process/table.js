/**
 * bresources/process 表格数据接口
 * 
 * @author gill
 * @date 2018-05-02
 */

import inherit from 'jw_common/inherit'
import AbstractModel from 'jw_models/abstract'
import staticData from 'jw_common/data'

const PAGE_SIZE = staticData.tablePageSize

let ProcessList = inherit(AbstractModel, {
  initialization() {

    this.url = `${Jw.baseUrl}/procedure/searchIndex`
    this.type = 'post'
    this.param={}
  },

  dataFormat(data) {
    let list = data.data || []

    _.each(list,(item,index)=>{
      item.__index = index + 1
    })

    return list
  },

  execute(param) {
    
    this.setParam(param)
    return this.exec()
  }
})


export default new ProcessList()
