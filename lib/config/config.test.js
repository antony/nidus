'use strict'

import test from 'ava'
import { generate, parse } from '.'
import jsonfile from 'jsonfile'
import { stub } from 'sinon'
import { join } from 'path'
import { homedir } from 'os'
const { assign } = Object

const validConfig = {
  masterPassword: '6464test',
  cost: 16,
  blockSize: 8,
  parallelization: 4,
  keyLength: 32
}

test.before(t => {
  stub(jsonfile, 'writeFileSync').returns()
})

test.beforeEach(t => {
  jsonfile.writeFileSync.reset()
})

test('load valid config', async t => {
  t.deepEqual(await parse(validConfig), validConfig)
})

test('null master password', testInvalidConfig, assign({}, validConfig, { masterPassword: null }), '"masterPassword" must be a string')
test('non-string master password', testInvalidConfig, assign({}, validConfig, { masterPassword: 123 }), '"masterPassword" must be a string')
test('missing master password', testInvalidConfig, omit(validConfig, 'masterPassword'), '"masterPassword" is required')

test('null cost', testInvalidConfig, assign({}, validConfig, { cost: null }), '"cost" must be a number')
test('none-numeric cost', testInvalidConfig, assign({}, validConfig, { cost: 'hello' }), '"cost" must be a number')
test('missing cost', testInvalidConfig, omit(validConfig, 'cost'), '"cost" is required')
test('missing cost', testInvalidConfig, assign({}, validConfig, { cost: 0 }), '"cost" must be larger than or equal to 1')
test('missing cost', testInvalidConfig, assign({}, validConfig, { cost: 32 }), '"cost" must be less than or equal to 31')

test('null blockSize', testInvalidConfig, assign({}, validConfig, { blockSize: null }), '"blockSize" must be a number')
test('none-numeric blockSize', testInvalidConfig, assign({}, validConfig, { blockSize: 'hello' }), '"blockSize" must be a number')
test('missing blockSize', testInvalidConfig, omit(validConfig, 'blockSize'), '"blockSize" is required')

test('null parallelization', testInvalidConfig, assign({}, validConfig, { parallelization: null }), '"parallelization" must be a number')
test('none-numeric parallelization', testInvalidConfig, assign({}, validConfig, { parallelization: 'hello' }), '"parallelization" must be a number')
test('missing parallelization', testInvalidConfig, omit(validConfig, 'parallelization'), '"parallelization" is required')

test('null keyLength', testInvalidConfig, assign({}, validConfig, { keyLength: null }), '"keyLength" must be a number')
test('none-numeric keyLength', testInvalidConfig, assign({}, validConfig, { keyLength: 'hello' }), '"keyLength" must be a number')
test('missing keyLength', testInvalidConfig, omit(validConfig, 'keyLength'), '"keyLength" is required')

async function testInvalidConfig(t, config, errorMessage) {
	const error = await t.throws(parse(config), Error)
  t.is(error.message, errorMessage)
}
testInvalidConfig.title = providedTitle => `Invalid configuration :: ${providedTitle}`

function omit (obj, omitted) {
  return Object.keys(obj)
  .filter(key => key !== omitted)
  .reduce((curr, key) => assign(curr, { [key]: obj[key] }), {})
}

test('generates config file', async t => {
  await generate('xyz')
  t.is(jsonfile.writeFileSync.callCount, 1)
})

test('generate config file', async t => {
  await generate('xyz')
  const expectedFilename = join(homedir(), '.unstorepm')
  t.is(jsonfile.writeFileSync.firstCall.args[0], expectedFilename)
})

test('write generated contents', async t => {
  const expectedConfig = {
    masterPassword: 'abc',
    cost: 16,
    blockSize: 8,
    parallelization: 1,
    keyLength: 16
  }
  await generate('abc')
  t.deepEqual(jsonfile.writeFileSync.firstCall.args[2], expectedConfig)
})

test('config file exists', async t => {
  const expectedFilename = join(homedir(), '.unstorepm')
  const error = await t.throws(generate('xyz'), Error)
  t.is(error.message, `Configuration file ${expectedFilename} already exists. Either delete it or modify it by hand.`)
})