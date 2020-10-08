const assert = require('assert')
const conversion = require('../app/lib/conversion')

describe('some conversion test', () => {
  it('should convert from bytes in human readable size', () => {
    const result = conversion.convertBytes(2024000);
    assert.equal(result, '1.9 MB');
  })
})
