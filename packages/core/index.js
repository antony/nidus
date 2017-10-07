'use strict'

const config = require('./lib/config')
const { compare } = require('./lib/fingerprint')
const { generate } = require('./lib/service')

class Api {
    constructor (config) {
        this.config = config
    }

    fingerprint (password) {
        return compare(input, this.config.fingerprint)
    }

    generate (keyword) {
        return generate(keyword, this.config)
    }
}

exports.create = () => {
    const conf = await config.load()
    return new Api(conf)
}