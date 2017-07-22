'use strict'

const complexChars = '!@#$%^&*()_+{}:"<>?\|[];\',./`~abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('')
const simpleChars = complexChars.slice(29)

function convert (char, arr) {
  const index = char > arr.length ? char % arr.length : char
  return arr[index - 1]
}

function toPassword (signature, arr) {
  let s = ''
  signature.forEach(next => {
    const char = convert(next, arr)
    return s += char
  })
  return s
}

exports.simple = function (signature) {
  return toPassword(signature, simpleChars)
}

exports.complex = function (signature) {
  return toPassword(signature, complexChars)
}