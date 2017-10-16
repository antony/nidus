'use strict'

import test from 'ava'
import { generate } from '.'

const options = {
	cost: 2,
	blockSize: 1,
	parallelization: 1
}

test('wraps scrypt', t => {
	t.is(typeof generate, 'function')
})

test('resolves with encrypted string', async t => {
	const encrypted = new Uint8Array([122, 60, 239])
	const generated = await generate('aaa', 'password', options, 3)
	t.deepEqual(generated, encrypted)
})