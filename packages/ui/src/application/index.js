'use strict'

const { ipcMain } = require('electron')
const unstore = require('unstore')

ipcMain.on('login', () => console.log('do something'))

exports.bootstrap = async function () {
  await unstore.create()
}