/**
 * app/app/index 表格数据行删除
 * 
 * @author gill
 * @date 2018-05-02
 */

import inherit from 'jw_common/inherit'
import AbstractModel from 'jw_models/abstract'

let TableRowDeleteModel = inherit(AbstractModel, {
  initialization() {

    this.url = `${Jw.baseUrl}/bop/technology/parameter/delete/param`
    this.type = 'get'
  },

  execute() {

    return (
      this
        .exec()
        .then((data)=>{
           
          return Promise.resolve()
        })
    )
  }
})

export default new TableRowDeleteModel()



// import AbstractModel from 'jw_models/abstract'
// import inhert from 'jw_common/inherit'


          
// let TableRowDelete = inhert(AbstractModel,{

//   initialization() {
//     this.url = `${Jw.baseUrl}/bop/technology/parameter/delete/param`
//     this.type = 'post'
//   },

//   dataFormat(data) {
    
//     return data.result
//   },

//   execute(urlSuffix) {

//     this.url = URL_PREX + urlSuffix
//     return this.exec()
//   }
// })

// export default new TableRowDelete()