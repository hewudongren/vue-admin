
import inherit from 'jw_common/inherit'
import AbstractModel from 'jw_models/abstract'



let SaveOrgModel = inherit(AbstractModel,{
 initialization() {
   this.url=`${Jw.baseUrl}/bop/technology/parameter/add/param` 
   this.type = 'post'
 },

 dataFormat(data) {

  return data.result
 },

 execute(entity) {

  
  this.setParam(entity)
  return this.exec()
 }
})

export default new SaveOrgModel()