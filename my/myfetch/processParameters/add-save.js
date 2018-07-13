/**
 * app/edit/:id app新增/编辑 数据保存
 * 
 * @author gill
 * @date 2018-05-02
 */

import inherit from 'jw_common/inherit'
import AbstractModel from 'jw_models/abstract'
import staticData from 'jw_common/data'

let CreateUpdateAppModel = inherit(AbstractModel, {
  initialization() {
    //新增接口
    this.createUrl = '/bop/technology/parameter/add/param'
    //编辑接口
    this.updateUrl = '/platform/app/app/update-app'
    this.type = 'get'
  },

  execute(isCreate) {

    this.url = Jw.baseUrl + (isCreate? this.createUrl : this.updateUrl)
    return this.exec()
  }
})

export default new CreateUpdateAppModel()
