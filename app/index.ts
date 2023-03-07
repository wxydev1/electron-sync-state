const { BrowserWindow, app } = require("electron");
const path = require("path");
const url = path.resolve(__dirname, "../renderer/main.html");
app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      devTools: true,
      nativeWindowOpen: true,
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      nodeIntegrationInWorker: true,
    },
  });
  mainWindow.loadURL(url);
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    return {
      action: "allow",
    };
  });
});
