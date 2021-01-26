//destructuring i.e bringing things out of electron
const {app, BrowserWindow, Menu, globalShortcut, Accelerator} = require('electron')

//set enviournment 
process.env.NODE_ENV = 'development'

const isDev = process.env.NODE_ENV !== 'production' ? true : false
const isMac = process.platform === 'darwin' ? true : false

let mainWindow
let aboutWindow

function createMainWindow(){
    mainWindow = new BrowserWindow({
        title: 'Image Shrink',
        width: isDev? 1300: 750,
        height: 1000,
        // alwaysOnTop: true, 
        darkTheme: true,
        opacity: 1,
        icon: './assets/icons/shrink.png',
        resizable: isDev ? true : false,
        webPreferences: {
            nodeIntegration: true,
        },
    })
    if(isDev){
        mainWindow.webContents.openDevTools()
    }
    // mainWindow.loadURL(`file://${__dirname}/app/index.html`)
    mainWindow.loadFile('./app/index.html')
}

function createaboutWindow(){
    aboutWindow = new BrowserWindow({
        title: 'About',
        width: 300,
        height: 400,
        alwaysOnTop: true, 
        // darkTheme: true,
        // opacity: isDev ? 1 : 0.5,
        // icon: './assets/icons/pattern.png',
        resizable: false,
    })
    aboutWindow.loadFile('./app/about.html')
}

app.on('ready', () => {
    createMainWindow()

    //Menu object from electron builds from template
    const mainMenu = Menu.buildFromTemplate(menu)
    //Menu object also sets that menu
    Menu.setApplicationMenu(mainMenu)

    //this is how to create and use global shortcuts
    globalShortcut.register('CmdOrCtrl+R', () => mainWindow.reload())
    globalShortcut.register(isMac ? 'Command+Alt+I' : 'Ctrl+Shift+I', () => mainWindow.toggleDevTools())

    mainWindow.on('ready', () => (mainWindow = null))
})

//template for menu
const menu = [
    ...(isMac ? [{role: 'appMenu'}] : []), // a lot neater
    // above line does the same thing as the below "if" block
    // if(isMac){
    //     menu.unshift({ role: 'appMenu' })
    // }
    {
        // label: 'File',
        // submenu: [
        //     {
        //         label: 'Quit',
        //         //shortcuts
        //         accelerator: isMac ? 'Command+Q' : 'Ctrl+Q',
        //         click: () => app.quit()
        //     }
        // ]
        role : 'fileMenu',
    },
    {
        label: 'View',
        submenu: [
            {
                label: 'About',
                accelerator: isMac ? 'Command+Shift+A': 'Ctrl+Shift+A',
                click: () => createaboutWindow()
            }
        ]
    },
    ...(isDev ? [
        { 
            label: 'Developer',
            submenu: [
                { role: 'reload' },
                { role: 'forcereload' },
                { type: 'separator' },
                { role: 'toggledevtools' },
            ]
        }
    ] : [])
]

 

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