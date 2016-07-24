const path = require('path')
const {app} = require('electron')

app.setName('time-shifter')
app.setPath('userData', path.resolve(app.getPath('appData'), app.getName()))

app.on('ready', () => {
    const electronDevtoolsInstaller = require('electron-devtools-installer')
    const installExtension = electronDevtoolsInstaller.default
    const { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = electronDevtoolsInstaller

    Promise.all([
        installExtension(REACT_DEVELOPER_TOOLS),
        installExtension(REDUX_DEVTOOLS)
    ]).then(names => names.forEach(name => {
        console.log(`Added Extension:  ${name}`)
        app.quit()
    })).catch(err => {
        console.log('An error occurred: ', err)
        app.quit()
    })
})