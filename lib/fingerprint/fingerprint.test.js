'use strict'

import test from 'ava'
import { create, compare } from '.'

const fingerprint = 'annoyance anthropology clutches contentment certainty cartridge'

test('generates fingerprint from password', async t => {
  const fingerprint = await create('my-master-password')
	t.is(fingerprint, fingerprint)
})

test('compares fingerprint with password', async t => {
	t.true(await compare('my-master-password', fingerprint))
})

test('compares fingerprint with password', async t => {
	t.false(await compare('some-other-password', fingerprint))
})