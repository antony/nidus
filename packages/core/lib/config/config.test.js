'use strict'

import test from 'ava'
import { persist } from '.'
import jsonfile from 'jsonfile'
import { stub } from 'sinon'
import { join } from 'path'
import { homedir } from 'os'
import fs from 'fs'
import fingerprint from '../fingerprint'
const { assign } = Object

const expectedFilename = join(homedir(), '.niduspm.json')

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

const baseConfig = {
  cost: 16,
  blockSize: 8,
  parallelization: 1,
  keyLength: 16,
  readableLength: 8
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