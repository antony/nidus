'use strict'

const scrypt = require('../scrypt')
const password = require('../password')

const fingerprintPassword = '#29$93MJ+PzQ?wdT'
const config = {
  cost: 16,
  blockSize: 4,
  parallelization: 1
}
const fingerprintLength = 6

const create = exports.create = async function (masterPassword) {
  const bytes = await scrypt.generate(masterPassword, fingerprintPassword, config, fingerprintLength)
  return password.readable(bytes)
}

exports.compare = async function (masterPassword, fingerprint) {
  const actual = await create(masterPassword)
  return fingerprint === actual
}