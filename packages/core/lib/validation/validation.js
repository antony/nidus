'use strict'

const { validate, string, number } = require('joi')

const configSchema = {
  fingerprint: string().required(),
  cost: number().required().min(1).max(31),
  blockSize: number().required(),
  parallelization: number().required(),
  keyLength: number().required(),
  readableLength: number().required()
}

exports.verify = function (config) {
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

exports.validate = function (input, parameter) {
  return new Promise((resolve) => {
    validate(input, configSchema[parameter], (err, result) => {
      resolve(err ? err.details[0].message : true)
    })
  })
}