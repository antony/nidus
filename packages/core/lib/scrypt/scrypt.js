'use strict'

const scrypt = require('scrypt-async')

exports.generate = function (keyword, options, length) {
  const { masterPassword, cost, blockSize, parallelization } = options

  return new Promise(resolve => {
    scrypt(keyword, masterPassword, {
      logN: cost,
      r: blockSize,
      p: parallelization,
      dkLen: length,
      encoding: 'binary'
    }, resolve)
  })
}