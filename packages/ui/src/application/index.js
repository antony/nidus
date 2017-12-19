'use strict'

const { app, BrowserWindow, remote, ipcMain } = require('electron')
const nidus = require('nidus-core')

let api
let mainWindow

ipcMain.on('config:save', async (event, { password, keyLength, readableLength }) => {
  await nidus.config.persist({
    masterPassword: password,
    cost: 8,
    parallelization: 1,
    blockSize: 12,
    keyLength,
    readableLength
  })
  await bootstrap()
  event.sender.send('state:change', { state: 'login' })
})

ipcMain.on('generate', async (event, { keyword }) => {
  event.sender.send('generate:results', await api.generate(keyword))
})

ipcMain.on('login', async (event, { password }) => {
  try {
    await api.login(password)
    event.sender.send('login:success')
  } catch (e) {
    event.sender.send('login:error', { message: e.message })
  }
})

ipcMain.on('application:bootstrap', async () => {
  await bootstrap()
  return
})

ipcMain.on('application:exit', () => {
  return app.quit()
})

ipcMain.on('appliation:minimize', () => {
  return mainWindow.hide()
})

async function bootstrap () {
  try {
    api = await nidus.create()
    mainWindow.webContents.send('state:change', { state: 'login' })
  } catch (e) {
    mainWindow.webContents.send('state:change', { state: 'setup' })
  }
}

exports.create = function () {
  if (!mainWindow) {
    mainWindow = new BrowserWindow({
      height: 500,
      width: 400,
      frame: false
    })

    mainWindow.toggleDevTools()

    mainWindow.loadURL(`file://${__dirname}/../../dist/app.html`)
  }
}
