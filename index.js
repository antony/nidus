'use strict'


// const { join } = require('path')

//   const cwd = process.cwd()
//   const config = require(join(cwd, path))

const scrypt = require('scrypt-async')
const complex = '!@#$%^&*()_+{}:"<>?\|[];\',./`~abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('')
const simple = complex.slice(31)

function convert (char, arr) {
  const index = char > arr.length ? char % arr.length : char
  return arr[index]
}

scrypt('http://www.dogsbody.io', '2granularangular50', {
    N: 16384,
    r: 8,
    p: 1,
    dkLen: 32,
    encoding: 'binary'
}, function(derivedKey) {
  let s = ''
  derivedKey.forEach(next => {
    const char = convert(next, simple)
    return s += char
  })

  console.log('Simple:', s)
})