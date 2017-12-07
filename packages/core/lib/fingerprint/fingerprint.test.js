'use strict'

import test from 'ava'
import { create, compare } from '.'

const fingerprint = 'schoolboy hostility duchess rebirth brightness cassette'

test('generates fingerprint from password', async t => {
  const created = await create('my-master-password')
	t.is(created, fingerprint)
})

test('compares fingerprint with password', async t => {
	t.true(await compare('my-master-password', fingerprint))
})

test('compares fingerprint with different password', async t => {
	t.false(await compare('some-other-password', fingerprint))
})