'use strict';

const path = require('path');
const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const Tray = electron.Tray;
const app = electron.app;

var Positioner = require('electron-positioner');

var iconIdle = path.join(__dirname, 'images', 'icon-idle.png');
var iconActive = path.join(__dirname, 'images', 'icon-active.png');

var appIcon;
var cachedBounds;

// アプリ起動後dockからアイコンを消す
app.dock.hide(); 

app.on('ready', function () {

  appIcon = new Tray(iconIdle);

  var windowPosition = 'trayCenter';
  var size = electron.screen.getPrimaryDisplay().size;

  function initMenu() {
    const template = [
      {
        label: 'Twitter Mini',
        submenu: [
          {
            label: 'About Twitter Mini',
            click: function () {
              showAbout();
            }
          },
          {
            type: 'separator'
          },
          {
            label: 'Quit',
            accelerator: 'Command+Q',
            click: function () {
              app.quit();
            }
          }
        ]
      },
      {
        label: 'View',
        submenu: [
          {
            label: 'Desktop',
            click(item, focusedWindow) {
              if (focusedWindow) {
                appIcon.window.setSize(1050, size.height);
                showWindow(cachedBounds);
              }
            }
          },
          {
            label: 'Mobile',
            click(item, focusedWindow) {
              if (focusedWindow) {
                appIcon.window.setSize(500, size.height);
                showWindow(cachedBounds);
              }
            }
          },
          {
            label: 'Reload',
            accelerator: 'CmdOrCtrl+R',
            click(item, focusedWindow) {
              if (focusedWindow) focusedWindow.reload();
            }
          },
          {
            type: 'separator'
          },
          {
            label: 'Toggle Developer Tools',
            accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
            click(item, focusedWindow) {
              if (focusedWindow)
                focusedWindow.webContents.toggleDevTools();
            }
          },
        ]
      },
      {
        label: 'Window',
        submenu: [
          {
            label: 'Minimize',
            role: 'minimize'
          },
          {
            label: 'Close',
            role: 'close'
          },
        ]
      },
      {
        label: 'Help',
        submenu: [
          {
            label: 'Contact',
            click() { require('electron').shell.openExternal('mailto:dongrify@gmail.com'); }
          },
        ]
      },
    ];

    var menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  }

  function hideWindow() {
    if (!appIcon.window) { return; }
    appIcon.window.hide();
  }

  function initWindow() {
    var size = electron.screen.getPrimaryDisplay().size;
    var defaults = {
      width: 500,
      height: size.height,
      show: false,
      frame: false,
      resizable: true,
    };

    appIcon.window = new BrowserWindow(defaults);
    appIcon.positioner = new Positioner(appIcon.window);
    appIcon.window.loadURL('https://twitter.com');
    appIcon.window.on('blur', hideWindow);
    appIcon.window.setBackgroundColor("#000000");
    appIcon.window.setVisibleOnAllWorkspaces(true);
    // appIcon.window.webContents.openDevTools();

    initMenu();
    checkNotifications();

  }

  function showWindow(trayPos) {
    var noBoundsPosition;
    if (trayPos === undefined) {
      noBoundsPosition = 'topCenter';
    }
    var position = appIcon.positioner.calculate(noBoundsPosition || windowPosition, trayPos);
    appIcon.window.setPosition(position.x, position.y);
    appIcon.window.show();
  }

  initWindow();
  showWindow(cachedBounds);

  appIcon.on('click', function (e, bounds) {
    if (e.altKey || e.shiftKey || e.ctrlKey || e.metaKey) { return hideWindow(); };
    if (appIcon.window && appIcon.window.isVisible()) { return hideWindow(); };
    bounds = bounds || cachedBounds;
    cachedBounds = bounds;
    showWindow(cachedBounds);
  });

  appIcon.setToolTip('Twitter Mini');

  app.on('activate', function () {
    showWindow(cachedBounds);
  });
});

exports.changeAppIcon = function (active) {
  if (active == true) {
    appIcon.setImage(iconActive);
  } else {
    appIcon.setImage(iconIdle);
  }
};

exports.showWindow = function () {
  appIcon.window.show();
};

exports.windowIsVisible = function () {
  return appIcon.window.isVisible();
};


function checkNotifications() {
  appIcon.window.webContents.executeJavaScript(
    "document.getElementsByClassName('css-76zvg2 r-1awozwy r-urgr8i r-sdzlij r-1wr3zt5 r-jwli3a r-6koalj r-1qd0xha').length;", true)
    .then((countValue) => {
      if (countValue > 0) {
        appIcon.setImage(iconActive);
      } else {
        appIcon.setImage(iconIdle);
      }
    }
  );
  setTimeout(checkNotifications, 5000);
};
