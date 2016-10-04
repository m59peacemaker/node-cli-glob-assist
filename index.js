const {stat, statSync} = require('fs')

const globAssist = (globs = [], pattern = '', cb) => {
  if (!globs.length) {
    cb(null, [pattern])
  } else if (globs.length === 1) {
    const file = globs[0]
    stat(file, (err, stats) => {
      if (err) {
        if (err.code === 'ENOENT') {
          cb(null, globs)
        } else {
          cb(err)
        }
      } else if (stats.isDirectory()) {
        cb(null, [`${file}/${pattern}`])
      } else {
        cb(null, globs)
      }
    })
  } else {
    cb(null, globs)
  }
}

const globAssistSync = (globs = [], pattern = '') => {
  if (!globs.length) {
    return [pattern]
  } else if (globs.length === 1) {
    const file = globs[0]
    try {
      const stats = statSync(file)
      if (stats.isDirectory()) {
        return [`${file}/${pattern}`]
      }
    } catch (err) {
      return globs
    }
  }
  return globs
}

globAssist.sync = globAssistSync

module.exports = globAssist
