'use strict'

const { join } = require('path')
const pkg = require('../../package.json')
const cli = require('caporal')
const config = require('../config')
const { generate } = require('../scrypt')
const { simple, complex } = require('../generate')

exports.bootstrap = async function () {
  cli
    .version(pkg.version)
    .command('show', 'show password for a given keyword') 
      .argument('<keyword>', 'site name, email address, folder name, or anything else', /^.*$/)
      .action(async (args, options, logger) => {
        const { keyword } = args
        const conf = await config.load()
        const signature = await generate(keyword, conf)

        logger.info('Simple', simple(signature))
        logger.info('Complex', complex(signature))
        logger.info('Readable', readable(signature))
      })
    .command('config', 'generate basic configuration file')
      .argument('<masterPassword>', 'master password, required to generate all passwords', /^.*$/)
      .action((args, options, logger) => {
        const { masterPassword } = args
        const path = config.generate(masterPassword)
        logger.info('Generated config file at', path)
      })
  return Promise.resolve(cli)
}
