'use strict'

const { ipcMain } = require('electron')
const nidus = require('nidus-core')

let api

ipcMain.on('config:save', async (event, { password, keyLength, readableLength }) => {
  await nidus.config.persist({
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
    event.sender.send('login:error', { message: e.message })
  }
})

exports.bootstrap = async function (mainWindow) {
  try {
    api = await nidus.create()
    mainWindow.webContents.send('state:change', { state: 'login' })
  } catch (e) {
    mainWindow.webContents.send('state:change', { state: 'setup' })
  }
}
