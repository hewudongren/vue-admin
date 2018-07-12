import AbstractModel from 'jw_models/abstract'
import inhert from 'jw_common/inherit'

const URL_PREX = `${Jw.i18n}/i18nResourceSet/deleteI18nResourceSetById/`
          
let TableRowDelete = inhert(AbstractModel,{

  initialization() {
    this.url = `${Jw.baseUrl}/procedure/searchIndex`
    this.query={
      id:""
    }
    this.type = 'post'
  },

  dataFormat(data) {
    
    return data.result
  },

  execute(id) {
    
    return this.exec()
  }
})

export default new TableRowDelete()