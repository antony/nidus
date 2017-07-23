'use strict'

import test from 'ava'
import { generate } from '.'

test.beforeEach(t => {
  t.context.forms = generate(new Uint8Array([ 1, 2, 3, 4, 5 ]))
})

test('generates simple password from signature', t => {
	t.is(t.context.forms.simple, 'abcde')
})

test('generates complex password from signature', t => {
	t.is(t.context.forms.complex, '!@#$%')
})

test('generates readable password from signature', t => {
	t.is(t.context.forms.readable, 'armour barrymore cabot catholicism chihuahua')
})

test('bytes are longer than available alphabet', t => {
  const arr = new Uint8Array([ 1, 63, 125, 249, 120 ])
  const { simple } = generate(arr)
	t.is(simple, 'aaaa5')
})