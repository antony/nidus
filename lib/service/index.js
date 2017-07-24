'use strict'

const password = require('../password')
const scrypt = require('../scrypt')

exports.generate = async function (keyword, conf) {
  const bytes = await scrypt.generate(keyword, conf)
  return password.from(bytes)
}