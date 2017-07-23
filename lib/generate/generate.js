'use strict'

const complexChars = '!@#$%^&*()_+{}:"<>?\|[];\',./`~abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('')
const simpleChars = complexChars.slice(29)
const { nouns } = require('./nouns.json')

function convert (char, arr) {
  const index = char > arr.length ? char % arr.length : char
  return arr[index - 1]
}

exports.generate = function (signature) {
  const forms = signature.reduce((curr, next) => {
    curr.simple += convert(next, simpleChars)
    curr.complex += convert(next, complexChars)
    curr.words.push(convert(next, nouns))
    return curr
  }, { simple: '', complex: '', words: [] })

  return asOutput(forms)
}

function asOutput ({ simple, complex, words }) {
  const readable = words.join(' ').toLowerCase()
  return { simple, complex, readable }
}