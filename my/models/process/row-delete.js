import inhert from 'jw_common/inherit'
import AbstractModel from 'jw_models/abstract'

let RowDelete = inhert(AbstractModel,{

  initialization() {
    this.url = `${Jw.baseUrl}/procedure/delete`
    this.type = 'post'
  },

  dataFormat(data) {
    
    return data.data
  },

  execute(ids) {
    
    this.setParam(ids)
    return this.exec()
  }
})

export default new RowDelete()