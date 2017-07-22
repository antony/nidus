'use strict'

import test from 'ava'
import { complex, simple } from '.'

test('generates simple password from signature', t => {
  const arr = new Uint8Array([ 1, 2, 3, 4, 5 ])
	t.is(simple(arr), 'bcdef')
})

test('generates complex password from signature', t => {
  const arr = new Uint8Array([ 1, 2, 3, 4, 5 ])
	t.is(complex(arr), '@#$%^')
})

test('bytes are longer than available alphabet', t => {
  const arr = new Uint8Array([ 1, 63, 125, 249, 120 ])
	t.is(simple(arr), 'bbbb6')
})