'use strict'

const { join } = require('path')
const pkg = require('../../package.json')
const cli = require('caporal')
const config = require('../config')
const { generate } = require('../service')
const Vorpal = require('vorpal')
const inquirer = require('inquirer')
const fingerprint = require('../fingerprint')
const { bold  } = require('chalk')
const { validate } = require('../validation')
const ora = require('ora')

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
      message: 'Computational cost of password generation',
      validate: async input => {
        return await validate(input, 'cost')
      }
    },
    { 
      type: 'input',
      name: 'blockSize',
      message: 'Blocksize for password generation',
      validate: async input => {
        return await validate(input, 'blockSize')
      }
    },
    { 
      type: 'input',
      name: 'parallelization',
      message: 'Parallelisation for password generation',
      validate: async input => {
        return await validate(input, 'parallelization')
      }
    },
    { 
      type: 'input',
      name: 'keyLength',
      message: 'Length in characters of simple/complex passwords',
      validate: async input => {
        return await validate(input, 'keyLength')
      }
    },
    { 
      type: 'input',
      name: 'readableLength',
      message: 'Length in words of readable passwords',
      validate: async input => {
        return await validate(input, 'readableLength')
      }
    }
  ])

  const { fingerprint, path } = await config.persist(answers)

  console.log('\n')
  console.log('Master password fingerprint', bold.blue(fingerprint))
  console.log('Generated config file at', bold.yellow(path))
  console.log('\n')
}

function configured (conf) {
  clis.configured
    .delimiter('unstore>')

  clis.configured
    .command('show <keyword>', 'Create/show a password for a given keyword')
    .action(async function ({ keyword }, callback) {
      const wait = ora('Calculating passwords').start()
      const { simple, complex, readable } = await generate(keyword, conf)
      wait.succeed('Calculated passwords')

      this.log('\n')
      this.log('Simple', bold.yellow(simple))
      this.log('Complex', bold.green(complex))
      this.log('Readable', bold.blue(readable))
      this.log('\n')
      callback()
    })
  
  clis.configured.show()
}

exports.cli = async function () {
  let api
  try {
    api = await Api.create()
  } catch (e) {
    console.log(e)
    console.log(`No configuration file found at ${bold.red(config.DEFAULT_FILENAME)}, so we'll create a new one.\n`)
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
    }
  ])
  
  const conf = Object.assign({}, configuration, { masterPassword })
  return configured(conf)
}