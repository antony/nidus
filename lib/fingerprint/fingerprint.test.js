'use strict'

import test from 'ava'
import { create, compare } from '.'

test('generates fingerprint from password', t => {
  const fingerprint = create('my-master-password')
	t.is(fingerprint, 'dog bark cow tree')
})

test('compares fingerprint with password', t => {
	t.true(compare('my-master-password', 'dog bark cow tree'))
})