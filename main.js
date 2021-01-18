//destructuring i.e bringing things out of electron
const {app, BrowserWindow } = require('electron')

function createMainWindow(){
    const mainWindow = new BrowserWindow({
        title: 'Image Shrink',
        width: 1920,
        height: 1080,
        alwaysOnTop: true,
        darkTheme: true,
        opacity: 0.5,
    })

}


app.on('ready', createMainWindow)