'use strict'

const scrypt = require('scrypt-async')

exports.generate = function (keyword, options) {
  const { masterPassword, cost, blockSize, parallelization, keyLength } = options

  return new Promise(resolve => {
    scrypt(keyword, masterPassword, {
      logN: cost,
      r: blockSize,
      p: parallelization,
      dkLen: keyLength,
      encoding: 'binary'
    }, resolve)
  })
}