const path = require('path')
const isDev = require('electron-is-dev')
const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    autoHideMenuBar: true,
    icon: path.resolve(__dirname, '..', 'error.png'),
    enableBlinkFeatures: 'SpeechRecognition',
  })

  if (!isDev) {
    win.maximize()
  }

  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.resolve(__dirname, '..', 'build', 'index.html')}`,
  )

  // Lidar com a mensagem do processo de renderização para iniciar o reconhecimento de fala
// ipcMain.on('start-speech-recognition', (event) => {
//   console.log('CHEGOU NO BACK: ', event);
//   // Solicitar permissão para acessar o microfone
//   win.webContents
//     .getUserMedia({ audio: true })
//     .then(function(stream) {
//       console.log('STREAM: ', stream);
//       // O usuário concedeu permissão para acessar o microfone
//       // Agora você pode iniciar o reconhecimento de fala ou fazer qualquer outra coisa com o áudio.
//     })
//     .catch(function(error) {
//       // O usuário negou a permissão ou ocorreu um erro
//       console.error('Erro ao acessar o microfone:', error);
//     });
// });

}

app.whenReady().then(() => {
  createWindow()
  // app.commandLine.appendSwitch('enable-features', 'WebSpeechAPI');

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
