'use strict'

const scrypt = require('../scrypt')
const json = require('jsonfile')
const { homedir } = require('os')
const fs = require('fs')
const { join } = require('path')
const { assign } = Object
const fingerprint = require('../fingerprint')
const { verify } = require('../validation')

const DEFAULT_FILENAME = module.exports.DEFAULT_FILENAME = '.unstorepm.json'

exports.load = function () {
  const path = join(homedir(), DEFAULT_FILENAME)
  const exists = fs.existsSync(path)
  if (!exists) {
    throw new Error(`Configuration file could not be found. Run 'unstore config' to generate one.`)
  }
  const config = require(path)
  return verify(config)
}

exports.persist = async function (options) {
  const path = join(homedir(), DEFAULT_FILENAME)
  const exists = fs.existsSync(path)
  if (exists) {
    throw new Error(`Configuration file ${path} already exists. Either delete it or modify it by hand.`)
  }

  const {
    cost,
    parallelization,
    blockSize,
    keyLength,
    readableLength
  } = options

  const fp = await fingerprint.create(options.masterPassword)
  const generatedConfig = {
    fingerprint: fp,
    cost,
    parallelization,
    blockSize,
    keyLength,
    readableLength
  }

  json.writeFileSync(path, generatedConfig, { spacing: 2 })
  return { path, fingerprint: fp }
}