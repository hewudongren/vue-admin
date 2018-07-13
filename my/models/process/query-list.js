/**
 * bresources/process 查询下拉选择
 * 
 * @author gill
 * @date 2018-05-02
 */

import inherit from 'jw_common/inherit'
import AbstractModel from 'jw_models/abstract'

let QueryListModel = inherit(AbstractModel, {
  initialization() {

    this.url = `${Jw.baseUrl}/procedure/initQueryForm`
    this.type = 'get'
  },

  dataFormat(data) {
    let queryConf = data.data || {}

    _.each(queryConf,(attrData,attr)=>{

      queryConf[attr] = _.map(attrData,(val)=>{
        return {
          value: val,
          label: val
        }
      })
    })

    return queryConf
  }
})

export default new QueryListModel()