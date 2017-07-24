'use strict'

const { validate, string, number } = require('joi')
const scrypt = require('../scrypt')
const json = require('jsonfile')
const { homedir } = require('os')
const fs = require('fs')
const { join } = require('path')
const { assign } = Object
const fingerprint = require('../fingerprint')

const DEFAULT_FILENAME = module.exports.DEFAULT_FILENAME = '.unstorepm.json'
const defaultConfig = {
  cost: 16,
  blockSize: 8,
  parallelization: 1,
  keyLength: 16
}

const configSchema = {
  masterPassword: string().required(),
  cost: number().required().min(1).max(31),
  blockSize: number().required(),
  parallelization: number().required(),
  keyLength: number().required()
}

function verify (config) {
  return new Promise((resolve, reject) => {
    validate(config, configSchema, (err, result) => {
      if (err) {
        const message = err.details[0].message
        return reject(new Error(message))
      }
      resolve(result)
    })
  })
}

exports.parse = function (config) {
  return verify(config)
}

exports.load = function () {
  const path = join(homedir(), DEFAULT_FILENAME)
  if (!fs.existsSync(path)) {
    throw new Error(`Configuration file could not be found. Run 'unstore config' to generate one.`)
  }
  const config = require(path)
  return verify(config)
}

exports.generate = function (masterPassword) {
  const path = join(homedir(), DEFAULT_FILENAME)
  if (fs.existsSync(path)) {
    throw new Error(`Configuration file ${path} already exists. Either delete it or modify it by hand.`)
  }

  const generatedConfig = assign({}, defaultConfig, { masterPassword })

  return new Promise((resolve, reject) => {
    json.writeFileSync(path, generatedConfig, { spacing: 2 })
    return resolve({ path, fingerprint })
  })
}