'use strict'

const { bootstrap } = require('./lib/cli')

bootstrap().then(cli => {
  cli.parse(process.argv)
})