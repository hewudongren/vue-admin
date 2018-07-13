import inhert from 'jw_common/inherit'
import AbstractModel from 'jw_models/abstract'

let AdditionModel = inhert(AbstractModel,{

  initialization() {
    this.url = `${Jw.baseUrl}/procedure/add`
    this.type = 'post'
  },

  dataFormat(data) {
    
    return data.data
  },

  execute(newProcess) {
    
    this.setParam(newProcess)
    return this.exec()
  }
})

export default new AdditionModel()