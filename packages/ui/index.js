'use strict'

const { app, BrowserWindow } = require('electron')
const { bootstrap } = require('./src/application')

let mainWindow

async function createWindow () {
  mainWindow = new BrowserWindow({
    height: 400,
    width: 260
  })

  mainWindow.loadURL(`file://${__dirname}/dist/index.html`)
  mainWindow.webContents.openDevTools()
  await bootstrap()
}

app.on('ready', createWindow)

app.on('activate', async function () {
  if (mainWindow === null) {
    await createWindow()
  }
})

