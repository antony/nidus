'use strict'

const complexChars = '!@#$%^&*()_+{}:"<>?\|[];\',./`~abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('')
const simpleChars = complexChars.slice(29)
const { nouns } = require('./nouns.json')

function convert (char, arr) {
  const index = char < arr.length ? char : char % arr.length
  return arr[index]
}

function generateCharacterPasswords (signature) {
  return signature.reduce((curr, next) => {
    curr.simple += convert(next, simpleChars)
    curr.complex += convert(next, complexChars)
    return curr
  }, { simple: '', complex: '' })
}

function generateReadablePassword (signature) {
  const readable = signature.reduce((curr, next) => {
    curr.push(convert(next, nouns))
    return curr
  }, [])
  return { readable: readable.join(' ').toLowerCase() }
}

exports.readable = function generateReadable (characters) {
  return generateReadablePassword(characters).readable
}

exports.from = function (characterSignature, wordsSignature) {
  const { simple, complex } = generateCharacterPasswords(characterSignature)
  const { readable } = generateReadablePassword(wordsSignature)

  return { simple, complex, readable }
}
