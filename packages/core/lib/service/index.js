'use strict'

const password = require('../password')
const scrypt = require('../scrypt')

exports.generate = async function (keyword, masterPassword, conf) {
  const characterBytes = await scrypt.generate(keyword, masterPassword, conf, conf.keyLength)
  const wordBytes = await scrypt.generate(keyword, masterPassword, conf, conf.readableLength)
  return password.from(characterBytes, wordBytes)
}