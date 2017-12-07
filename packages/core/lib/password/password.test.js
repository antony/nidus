'use strict'

import test from 'ava'
import { from } from '.'

test.beforeEach(t => {
	const arr = new Uint8Array([ 1, 2, 3, 4, 5 ])
  t.context.forms = from(
		arr,
		arr
	)
})

test('generates simple password from signature', t => {
	t.is(t.context.forms.simple, 'bcdef')
})

test('generates complex password from signature', t => {
	t.is(t.context.forms.complex, '@#$%^')
})

test('generates readable password from signature', t => {
	t.is(t.context.forms.readable, 'viewpoint gunman eagerness disservice melodrama')
})

test('lower bounds', testExtents, new Uint8Array([0, 1, 2]), 'abc')
test('upper bounds', testExtents, new Uint8Array([60, 61, 62, 63]), '89ab')


async function testExtents(t, bytes, expected) {
  const { simple } = from(bytes, bytes)
	t.is(simple, expected)
}
testExtents.title = providedTitle => `Test array extents :: ${bytes}`