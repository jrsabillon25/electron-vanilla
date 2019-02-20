const {app, BrowserWindow, Menu} = require('electron');
const mysql = require('mysql');

var connection, window;

function handleConnection(){
    try{
        connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '12345678',
            database: 'db'
        });
    
        connection.connect(function(err){
            if(err){
                throw err;
            }
            console.log("CONNECTED!");
        });
    }catch(exception){
        console.error(exception);
    }
}

handleConnection();

exports.connection = connection;

function createWindow(){
    window = new BrowserWindow({width: 800, height: 600});

    window.loadFile('./views/index.html');
    window.setMenu(null);

    modifyMenu();

    window.on('closed', function(){
        window = null;
    });
}

function modifyMenu(){
    const template = [
        {
            label: "Developer",
            submenu: [
                {
                    label: "Open developer tools",
                    click () { window.webContents.openDevTools(); }
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

app.on('ready', createWindow);

app.on('window-all-closed', function(){
    if(process.platform !== 'darwin'){
        app.quit();
    }
})

app.on('activate', function(){
    if (window === null){
        createWindow();
    }
})