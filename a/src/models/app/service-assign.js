/**
 * 对APP进行微服务授权
 * 
 * @author gill
 * @date 2018-05-02
 */

import inherit from 'jw_common/inherit'
import AbstractModel from 'jw_models/abstract'
import staticData from 'jw_common/data'

let ServiceAssignModel = inherit(AbstractModel, {
  initialization() {

    this.url = Jw.gateway + '/platform/app/app/assign-app-apis'
    this.type = 'post'
  },

  execute() {

    return this.exec()
  }
})

export default new ServiceAssignModel()
