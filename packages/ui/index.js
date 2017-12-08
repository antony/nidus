'use strict'

const { app } = require('electron')
const { create } = require('./src/application')

app.on('ready', create)
app.on('activate', create)
