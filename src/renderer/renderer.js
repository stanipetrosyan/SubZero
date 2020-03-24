'use strict'

const group_list = document.getElementById('group-list');
const project_list = document.getElementById('project-list');

let data = null;
let builder = new HTMLBuilder();

refresh();

function refresh() {
   // setTheme(ipcRenderer.sendSync('theme-request'));
    data = window.api.request();
    printProjectList();
    printGroupList();
}

function printProjectList() {
    project_list.innerHTML = '';
    data.forEach(element => {
       printProjectForGroup(element);
    });
}

function printProjectForGroup(group) {
    group.projects.forEach(item => {
        let project =  createProjectElement(item)
        project.childNodes[0].lastChild.addEventListener('click', _=> {
            window.api.updateproject(item)
        })
        project.childNodes[2].addEventListener('click', _=> {
            window.api.openproject(item) 
        })
        project_list.append(project)
    })
}

function printGroupList() {
    data.forEach(item => {
        let group = createGroupElement(item)
        group.childNodes[1].addEventListener('click', _=> {
            project_list.innerHTML = '';
            printProjectForGroup(item);
        })
        group.childNodes[2].addEventListener('click', _=> {
            window.api.updategroup(item)
        })
        group_list.appendChild(group)
    })
}

function createProjectElement(project) {
    let div = builder.createElement('div', 'item', '');
    let title = builder.createElement('h2', 'title-project', project['name']);
    title.appendChild(builder.createElement('div', 'project-modify-icon', '', 'up'));
    builder.appendAllChild(div, [
        title,
        builder.createElement('p', 'subtitle-project', project['language']),
        builder.createElement('button', 'button button-subzero button-right', 'OPEN'), 
    ]);
    if(project['repo']){
        div.appendChild(builder.createElement('div', 'project-git-icon', '', 'git'));
    }
    return div;
}

function createGroupElement(group) {
    let div = builder.createElement('div','group-item', '');
    let g_type = builder.createElement('div', 'group-type', '')
    let g_color = builder.createElement('span', 'group-color', '');
    let modify = builder.createElement('div', 'group-modify-icon', '');
    g_color.style.backgroundColor = group['color'];
    g_type.appendChild(builder.createElement('p', 'group-label', group['name']));
    builder.appendAllChild(div, [g_color, g_type, modify]);
    return div;
}

document.getElementById('newGroup').addEventListener('click', _=> {
    window.api.openGroupModal();
})

document.getElementById('group-all').addEventListener('click', _=> {
    refresh();
})

/* ipcRenderer.on('refresh', () => {
    refresh();
})
*/