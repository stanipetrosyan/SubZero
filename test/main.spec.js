const Application = require('spectron').Application
const assert = require('assert')
const electronPath = require('electron')
const path = require('path')

describe('Application launch', function () {
    this.timeout(10000)

    beforeEach(function () {
        this.app = new Application({
            path: electronPath,
            args: [path.join(__dirname, '..')]
        })
        return this.app.start()
    })

    afterEach(function () {
        if (this.app && this.app.isRunning()) {
            this.app.stop();
        }
    })

    it ('should show main window', async function () {
        const count = await this.app.client.getWindowCount();
        assert.equal(count, 1)

    })

    it('should open new group window', async function () {
        this.app.client.click('#newGroup')
        const count = await this.app.client.getWindowCount();
        assert.equal(count, 1);
        this.app.client.windowByIndex(1);    
    })
}) 