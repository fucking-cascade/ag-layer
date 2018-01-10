/**
 * Created by xueyingchen.
 */
const fs = require('fs')

module.exports = {
  getDirModules (dirName) {
    return fs.readdirSync(dirName)
      .filter(name => name !== 'index.js')
      .map(name => name.substring(0, name.lastIndexOf('.')))
      .map(name => [name, require(dirName + `/${name}`)])
  }
}