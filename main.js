//destructuring i.e bringing things out of electron
const {app, BrowserWindow } = require('electron')

let mainWindow 
function createMainWindow(){
    mainWindow = new BrowserWindow({
        title: 'Image Shrink',
        width: 1680,
        height: 940,
        alwaysOnTop: true,
        darkTheme: true,
        opacity: 1,
    })
     
    mainWindow.loadURL(`file://${__dirname}/app/index.html`)
}


app.on('ready', createMainWindow)