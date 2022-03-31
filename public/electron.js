const { app, BrowserWindow } = require('electron')
const TDAmeritrade = require('tdameritrade')

const CONSUMER_KEY = "SHEEQPMVZTPIQEY5LPWNM9BIJ5HAKKCV" // should be safe ot be public. visible in oauth scope anyways
const td = new TDAmeritrade(CONSUMER_KEY)
const url = 'https://localhost:3000'

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            partition: 'persist:main'
        }
    })
	console.log(td.getOauthLink(url))
	win.loadURL(td.getOauthLink(url))
}

app.whenReady().then(createWindow)

app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
	event.preventDefault()
	callback(url.includes('localhost:3000'))
})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
