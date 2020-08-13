setTheme(window.request.theme());
document.getElementById("defaultTab").click();

document.getElementById('light-theme').addEventListener('click', _ =>{
    window.user.updatetheme('light')
})

document.getElementById('dark-theme').addEventListener('click', _ =>{
    window.user.updatetheme('default')
})

document.getElementById('cancel').addEventListener('click', _ =>{
    window.modals.close();
})

function changeTab(event, tabName) {
    let tabcontent = document.getElementsByClassName("tabcontent");
    for (let item of tabcontent) {
       item.style.display = "none"
    }
  
    let tablinks = document.getElementsByClassName("tab-links");
    for (let item of tablinks) {
       item.className = item.className.replace(" active", "");
    }
  
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.className += " active";
} 