//destructuring i.e bringing things out of electron
const {app, BrowserWindow } = require('electron')

//set enviournment 
process.env.NODE_ENV = 'development'

const isDev = process.env.NODE_ENV !== 'production' ? true : false
const isMac = process.platform === 'darwin' ? true : false


let mainWindow 
function createMainWindow(){
    mainWindow = new BrowserWindow({
        title: 'Image Shrink',
        width: 1680,
        height: 940,
        // alwaysOnTop: true, 
        darkTheme: true,
        opacity: isDev ? 1 : 0.5,
        icon: './assets/icons/shrink.png',
        resizable: isDev ? true : false,

    })
    // mainWindow.loadURL(`file://${__dirname}/app/index.html`)
    mainWindow.loadFile('./app/index.html')
}
 
app.on('ready', createMainWindow)

app.on('window-all-closed', () => {

    if (!isMac){
        app.quit()
    }
})

app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0){
        createMainWindow()
    }
})

app.allowRendererProcessReuse = true