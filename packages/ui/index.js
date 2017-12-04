'use strict'

const { app, BrowserWindow, ipcMain } = require('electron')
const { bootstrap } = require('./src/application')

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    height: 500,
    width: 400
  })

  mainWindow.loadURL(`file://${__dirname}/dist/index.html`)
}

app.on('ready', createWindow)

ipcMain.on('application:bootstrap', () => {
  return bootstrap(mainWindow)
})

app.on('activate', async function () {
  if (mainWindow === null) {
    await createWindow()
  }
})
