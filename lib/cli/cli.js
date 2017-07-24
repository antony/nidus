'use strict'

const { join } = require('path')
const pkg = require('../../package.json')
const cli = require('caporal')
const config = require('../config')
const { generate } = require('../service')
const Vorpal = require('vorpal')
const inquirer = require('inquirer')
const fingerprint = require('../fingerprint')
const clis = { 
  unconfigured: new Vorpal(),
  configured: new Vorpal()
}

function unconfigured () {
  clis.unconfigured
    .delimiter('unconfigured>')
    .show()

  clis.unconfigured
    .command('generate <master-password>', `Generate default configuration ~/${config.DEFAULT_FILENAME}`)
    .action(async function ({ 'master-password': masterPassword }, callback) {
      const { path, fingerprint } = await config.generate(masterPassword)
      this.log('master password fingerprint', )
      this.log('Generated config file at', path, 'it is wise to edit the values in here before generating passwords.')
      clis.configured.show()
      callback()
    })
  
  clis.unconfigured.show()
}

function configured (conf) {
  clis.configured
    .delimiter('unstore>')
    .show()

  clis.configured
    .command('show <keyword>', 'Create/show a password for a given keyword')
    .action(async function ({ keyword }, callback) {
      const { simple, complex, readable } = await generate(keyword, conf)

      this.log('Simple', simple)
      this.log('Complex', complex)
      this.log('Readable', readable)
      callback()
    })
  
  clis.configured.show()
}

exports.cli = async function () {
  let configuration
  try {
    configuration = config.load()
  } catch (e) {
    return unconfigured()
  }

  const answers = await inquirer.prompt([
    { 
      type: 'password',
      name: 'masterPassword',
      message: 'Enter master password',
      validate: (input) => { 
        return fingerprint.compare(input, configuration.fingerprint)
      }
    },
  ])
  const { masterPassword } = answers
  const conf = Object.assign({}, configuration, { masterPassword })
  return configured(conf)
}