'use strict'

const { ipcMain } = require('electron')
const unstore = require('unstore')

ipcMain.on('config:save', async (event, { password, keyLength, readableLength }) => {
  await unstore.config.persist({
    masterPassword: password,
    cost: 8,
    parallelization: 1,
    blockSize: 12,
    keyLength,
    readableLength
  })
  event.sender.send('reload')
})

ipcMain.on('login', () => console.log('do something'))

exports.bootstrap = async function () {
  await unstore.create()
}