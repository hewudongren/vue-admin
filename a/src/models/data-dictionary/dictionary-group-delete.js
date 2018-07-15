import AbstractModel from 'jw_models/abstract'
import inhert from 'jw_common/inherit'

const URL = `${Jw.gateway}/dict/group/deleteById/`

let DictionaryGroupDeleteModel = inhert(AbstractModel,{

  initialization() {
    this.type = 'post'
  },

  dataFormat(data) {
    
    return data.data
  },

  execute(urlSuffix) {

    this.url = URL + urlSuffix
    return this.exec()
  }
})

export default new DictionaryGroupDeleteModel()