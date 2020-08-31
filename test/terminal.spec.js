const assert = require('assert')
const cmd = require('node-cmd');
const platform = process.platform;

// TODO: Add windows and MacOS X testing

function openTerminalInsidePath(path) {
  switch (platform) {
    case 'linux': cmd.run('gnome-terminal -x bash -c "cd ' + path + '; exec bash"')
      break;
  }
}

describe('Terminal testing', () => {
  it('should check if exist at least one terminal in linux', () => {
    openTerminalInsidePath(__dirname);
    cmd.get('ps -C bash', (err, data, stderr) => {
      if (err) {
        return
      }
      assert.notEqual(data, null)
    })
  })

  it('should open VSCode', () => {
    cmd.run('code ' + __dirname)
    cmd.get('ps -C code', (err, data, stderr) => {
      if (err) {
        return
      }
      assert.notEqual(data, null)
    })
  })
})
