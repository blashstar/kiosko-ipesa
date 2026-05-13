import { contextBridge } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  // API mínima expuesta al renderer.
  // En el futuro se pueden añadir métodos de comunicación ipcRenderer aquí.
})
