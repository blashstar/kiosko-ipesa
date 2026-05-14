import { app, BrowserWindow, protocol } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ES_DESARROLLO = !app.isPackaged;
const URL_DESARROLLO = 'http://localhost:5173';
const RUTA_PRODUCCION = ES_DESARROLLO
    ? path.join(__dirname, '../dist/index.html')
    : path.join(process.resourcesPath, 'app.asar.unpacked', 'dist', 'index.html');
function crearVentanaPrincipal() {
    const ventana = new BrowserWindow({
        width: 1080,
        height: 1920,
        fullscreen: true,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
            webSecurity: false,
        },
    });
    ventana.setMenuBarVisibility(false);
    if (ES_DESARROLLO) {
        ventana.loadURL(URL_DESARROLLO);
    }
    else {
        ventana.loadFile(RUTA_PRODUCCION);
    }
    return ventana;
}
function normalizarPathname(pathname) {
    // Normalizar todos los separadores a /
    pathname = pathname.replace(/\\/g, '/');
    // En Windows: /C:/img/... -> C:/img/...
    // En Unix: /img/... -> /img/...
    // Remover prefijo de unidad Windows si existe: /C:/ -> (vacío), C:/ -> (vacío)
    const driveMatch = pathname.match(/^\/?([a-zA-Z]:)\/?/);
    if (driveMatch) {
        pathname = pathname.substring(driveMatch[0].length);
    }
    // Remover slash inicial si queda
    if (pathname.startsWith('/')) {
        pathname = pathname.substring(1);
    }
    return pathname;
}
function obtenerRutaBase() {
    if (ES_DESARROLLO) {
        return path.join(__dirname, '../dist');
    }
    return path.join(process.resourcesPath, 'app.asar.unpacked', 'dist');
}
app.whenReady().then(() => {
    // Interceptar protocolo file para manejar rutas absolutas /img/ en produccion
    if (!ES_DESARROLLO) {
        protocol.interceptFileProtocol('file', (request, callback) => {
            try {
                const url = new URL(request.url);
                const pathname = normalizarPathname(decodeURIComponent(url.pathname));
                const rutaCompleta = path.join(obtenerRutaBase(), pathname);
                callback({ path: rutaCompleta });
            }
            catch (error) {
                console.error('Error interceptando protocolo file:', error);
                callback({ path: request.url });
            }
        });
    }
    crearVentanaPrincipal();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            crearVentanaPrincipal();
        }
    });
});
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
