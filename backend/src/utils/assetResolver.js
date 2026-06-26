const fs = require('fs')

function createAssetResolver() {
  return {
    exists(path) {
      return fs.existsSync(path)
    },
  }
}

module.exports = { createAssetResolver }
