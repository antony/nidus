'use strict'

const config = require('./lib/config')
const fingerprint = require('./lib/fingerprint')
const service = require('./lib/service')
const validation = require('./lib/validation')

class Api {
    constructor (config) {
        this.config = config
    }

    async login (password) {
        const match = await fingerprint.compare(password, this.config.fingerprint)
        if (!match) {
            throw new Error('Supplied password does not match fingerprint')
        }
        this.password = password
        return match
    }

    generate (keyword) {
        return service.generate(keyword, this.password, this.config)
    }
}

exports.create = async () => {
    return config.load()
    .then(conf => {
      return new Api(conf)
    })
}

exports.config = config
exports.validation = validation