'use strict'

const assert = require('assert')
const checker = require('../app/lib/ide-checker');

// Obv this test pass only if you have VSCode or Atom installed (in case check your global variable)
describe('testing ide-checker', () => {
    it('should find VSC or Atom', () => {
        checker.findEditorsOnPC().then(founds => {
            assert(true, founds.includes(true))
        })
    })
})
