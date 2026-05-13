import { app, BrowserWindow } from 'electron'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const ES_DESARROLLO = !app.isPackaged
const URL_DESARROLLO = 'http://localhost:5173'
const RUTA_PRODUCCION = path.join(__dirname, '../dist/index.html')

function crearVentanaPrincipal(): BrowserWindow {
  const ventana = new BrowserWindow({
    width: 1080,
    height: 1920,
    fullscreen: true,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  ventana.setMenuBarVisibility(false)

  if (ES_DESARROLLO) {
    ventana.loadURL(URL_DESARROLLO)
  } else {
    ventana.loadFile(RUTA_PRODUCCION)
  }

  return ventana
}

app.whenReady().then(() => {
  crearVentanaPrincipal()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      crearVentanaPrincipal()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
