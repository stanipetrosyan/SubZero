'use strict'

const assert = require('assert')
const checker = require('../app/lib/editor-checker');

// Obv this test pass only if you have VSCode or Atom installed (in case check your global variable)
describe('testing editor-checker', () => {
    it('should find VSC', () => {
        const res = checker.findEditor('code');
        assert.equal(res, true);
    })

    it('should not find Atom', async () => {
        const res = checker.findEditor('atom');
        assert.notEqual(res, true);
    })
})
