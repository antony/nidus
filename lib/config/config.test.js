'use strict'

import test from 'ava'
import { persist, parse } from '.'
import jsonfile from 'jsonfile'
import { stub } from 'sinon'
import { join } from 'path'
import { homedir } from 'os'
import fs from 'fs'
import fingerprint from '../fingerprint'
const { assign } = Object

const expectedFilename = join(homedir(), '.unstorepm.json')

const validConfig = {
  fingerprint: 'a b c d e',
  cost: 16,
  blockSize: 8,
  parallelization: 4,
  keyLength: 32
}

test.before(t => {
  stub(jsonfile, 'writeFileSync')
  stub(fs, 'existsSync')
  stub(fingerprint, 'create')
})

test.afterEach(t => {
  fingerprint.create.reset()
  jsonfile.writeFileSync.reset()
  fs.existsSync.reset()
})

test('load valid config', async t => {
  t.deepEqual(await parse(validConfig), validConfig)
})

test('null fingerprint', testInvalidConfig, assign({}, validConfig, { fingerprint: null }), '"fingerprint" must be a string')
test('non-string fingerprint', testInvalidConfig, assign({}, validConfig, { fingerprint: 123 }), '"fingerprint" must be a string')
test('missing fingerprint', testInvalidConfig, omit(validConfig, 'fingerprint'), '"fingerprint" is required')

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

const baseConfig = {
  cost: 16,
  blockSize: 8,
  parallelization: 1,
  keyLength: 16
}

test.serial('persists config file', async t => {
  await persist({})
  t.is(jsonfile.writeFileSync.callCount, 1)
})

test.serial('generates fingerprint', async t => {
  const masterPassword = 'fffffff'
  await persist({ masterPassword })
  t.is(fingerprint.create.callCount, 1)
  t.is(fingerprint.create.firstCall.args[0], masterPassword)
})

test.serial('persist config file', async t => {
  await persist({})
  t.is(jsonfile.writeFileSync.firstCall.args[0], expectedFilename)
})

test.serial('persist contents', async t => {
  fingerprint.create.resolves('a b c d e')
  const expectedConfig = assign({ fingerprint: 'a b c d e'}, baseConfig)
  await persist(baseConfig)
  t.deepEqual(jsonfile.writeFileSync.firstCall.args[1], expectedConfig)
})

test.serial('config file exists', async t => {
  fs.existsSync.returns(true)
  const error = await t.throws(persist({}), Error)
  t.is(error.message, `Configuration file ${expectedFilename} already exists. Either delete it or modify it by hand.`)
})