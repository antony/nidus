'use strict'

const { app, BrowserWindow, ipcMain, remote } = require('electron')
const { bootstrap } = require('./src/application')

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    height: 500,
    width: 400,
    frame: false
  })

  mainWindow.loadURL(`file://${__dirname}/build/index.html`)
}

app.on('ready', createWindow)

ipcMain.on('application:bootstrap', () => {
  return bootstrap(mainWindow)
})

ipcMain.on('application:exit', () => {
  return app.quit()
})

ipcMain.on('appliation:minimize', () => {
  return remote.BrowserWindow.getFocusedWindow().minimize()
})

app.on('activate', async function () {
  if (mainWindow === null) {
    await createWindow()
  }
})
