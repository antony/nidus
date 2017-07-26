'use strict'

const { join } = require('path')
const pkg = require('../../package.json')
const cli = require('caporal')
const config = require('../config')
const { generate } = require('../service')
const Vorpal = require('vorpal')
const inquirer = require('inquirer')
const fingerprint = require('../fingerprint')
const { bold, blue, yellow } = require('chalk')

const clis = { 
  unconfigured: new Vorpal(),
  configured: new Vorpal()
}

async function unconfigured () {
  const answers = await inquirer.prompt([
    { 
      type: 'password',
      name: 'masterPassword',
      message: 'Master password'
    },
    { 
      type: 'input',
      name: 'cost',
      message: 'Computational cost of password generation'
    },
    { 
      type: 'input',
      name: 'blockSize',
      message: 'Blocksize for password generation'
    },
    { 
      type: 'input',
      name: 'parallelization',
      message: 'Parallelisation for password generation'
    },
    { 
      type: 'input',
      name: 'keyLength',
      message: 'Length (in characters or words) of generated password'
    }
  ])

  const { fingerprint, path } = await config.persist(answers)

  console.log(' Master password fingerprint', bold.blue(fingerprint))
  console.log(' Generated config file at', bold.yellow(path))
  clis.configured.show()
}

function configured (conf) {
  clis.configured
    .delimiter('unstore>')

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
    configuration = await config.load()
  } catch (e) {
    console.log(`No configuration file found at ${bold.red(config.DEFAULT_FILENAME)}, so we'll create a new one.`)
    return unconfigured()
  }

  const { masterPassword } = await inquirer.prompt([
    { 
      type: 'password',
      name: 'masterPassword',
      message: 'Enter master password',
      validate: async function (input) { 
        const match = await fingerprint.compare(input, configuration.fingerprint)
        return match || 'Master password is incorrect'
      }
    },
  ])

  const conf = Object.assign({}, configuration, { masterPassword })
  return configured(conf)
}