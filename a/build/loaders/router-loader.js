
let utils = require('../utils')

module.exports = function(routerSource) {
  let targetSystem = utils.getCommandParams('target')
  let projectConfig = require(utils.getTargetProjectPath(`${targetSystem}/package-config.js`))

  routerSource = routerSource.replace('__{targetSystem}__',targetSystem)
  if(projectConfig.excludeDefaultModules) {
    return utils.repleceSpecial(routerSource,'')
  }

  return routerSource
}