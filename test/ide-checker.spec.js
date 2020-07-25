'use strict'

const assert = require('assert')
const checker = require('../app/lib/ide-checker');

// Obv this test pass only if you have VSCode or Atom installed (in case check your global variable)
describe('testing ide-checker', () => {
    it('should find VSC', async () => {
        const res = await checker.findEditor("code");
        assert.equal(res, true);
    })

    it('should not find Atom', async () => {
       const res = await checker.findEditor("atom");
       assert.notEqual(res, true);
    })
})
