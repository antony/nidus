'use strict'

const scrypt = require('scrypt-async')

exports.generate = function (keyword, masterPassword, options, length) {
  const { cost, blockSize, parallelization } = options

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