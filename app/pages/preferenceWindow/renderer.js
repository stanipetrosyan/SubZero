let userData = window.request.setup();

setTheme(window.request.theme());
document.getElementById('defaultTab').click();

setSettings()

document.getElementById('cancel').addEventListener('click', _ => {
  window.modals.close();
})

document.getElementById('save').addEventListener('click', _ => {
  let updatedUserData = userData
  updatedUserData['settings']['openTerminal'] = document.getElementById('terminal').checked 
  window.user.updatesettings(updatedUserData)
})

function changeTheme(themeName) {
  window.user.updatetheme(themeName)
}

function changeTab(event, tabName) {
  const tabcontent = document.getElementsByClassName('tabcontent');
  for (const item of tabcontent) {
    item.style.display = 'none'
  }

  const tablinks = document.getElementsByClassName('tab-links');
  for (const item of tablinks) {
    item.className = item.className.replace(' active', '');
  }

  document.getElementById(tabName).style.display = 'block';
  event.currentTarget.className += ' active';
}

function setSettings() {
  document.getElementById('terminal').checked = userData['settings']['openTerminal']
}
