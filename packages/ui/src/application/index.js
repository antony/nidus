'use strict'

const { ipcMain } = require('electron')
const unstore = require('unstore')

let api

ipcMain.on('config:save', async (event, { password, keyLength, readableLength }) => {
  await unstore.config.persist({
    masterPassword: password,
    cost: 8,
    parallelization: 1,
    blockSize: 12,
    keyLength,
    readableLength
  })
  event.sender.send('state:change', { state: 'login' })
})

ipcMain.on('generate', async (event, { keyword }) => {
  event.sender.send('generate:results', await api.generate(keyword))
})

ipcMain.on('login', async (event, { password }) => {
  try {
    await api.login(password)
    event.sender.send('state:change', { state: 'generate' })
  } catch (e) {
    console.log('got an error', e)
    event.sender.send('login:error', { message: e.message })
  }
})

exports.bootstrap = async function (mainWindow) {
  try {
    api = await unstore.create()
    mainWindow.webContents.send('state:change', { state: 'login' })
  } catch (e) {
    mainWindow.webContents.send('state:change', { state: 'setup' })
  }
}
