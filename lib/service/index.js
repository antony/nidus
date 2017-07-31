'use strict'

const password = require('../password')
const scrypt = require('../scrypt')

exports.generate = async function (keyword, conf) {
  const { characterBytes } = await scrypt.generate(keyword, conf, conf.keyLength)
  const { wordBytes } = await scrypt.generate(keyword, conf, conf.readableLength)
  return password.from(characterBytes, wordBytes)
}