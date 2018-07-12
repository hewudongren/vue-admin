
import inherit from 'jw_common/inherit'
import AbstractModel from 'jw_models/abstract'

let NewOrgModel = inherit(AbstractModel,{
 initialization() {

   this.url = `${Jw.baseUrl}/procedure/modify`
   this.type = 'post'
 },

 dataFormat(data) {

  return data.result
 },

 execute(id) {
  this.setQuery(id)  

  return this.exec()
 }
})

export default new NewOrgModel()