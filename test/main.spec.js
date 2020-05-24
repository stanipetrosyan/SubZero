const Application = require('spectron').Application
const assert = require('assert')
const electronPath = require('electron')
const path = require('path')

const app = new Application({
    path: electronPath,
    args: [path.join(__dirname, '..')]
})

describe('Application launch', function () {
    this.timeout(10000)

    beforeEach(function () {
        return app.start()
    })

    afterEach(function () {
        if (app && app.isRunning()) {
            return app.stop();
        }
    })
    

    it ('should show main window', async () => {
        const count = await app.client.getWindowCount();
        return assert.equal(count, 1)
    })

/*     it('has the correct title', async () => {
        const title = await app.client.waitUntilWindowLoaded().getTitle();
        return assert.equal(title, 'SubZero');
    });
    
    it ('should not have the developer tools open', async () => {
        const devToolsAreOpen = await app.client.waitUntilWindowLoaded().browserWindow.isDevToolOpened();
        return assert.equal(devToolsAreOpen, false)
    }) */
}) 