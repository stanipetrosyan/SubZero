'use strict'

const group_list = document.getElementById('group-list');
const project_list = document.getElementById('project-list');
const search_bar = document.getElementById('checkbox');

let builder = new HTMLBuilder();

let data = window.api.request();
printProjectList()
printGroupList();
setTheme(window.api.themerequest());

project_list.appendChild(card);

setInterval(refresh, 1000)

function refresh() {
    setTheme(window.api.themerequest());
    let data_requested = window.api.request();
    if (JSON.stringify(data) !== JSON.stringify(data_requested)) {
        data = data_requested;
        printProjectList();
        printGroupList();
    }
}

function printProjectList() {
    project_list.innerHTML = '';
    data.forEach(element => {
       printProjectForGroup(element);
    });
}

function printProjectForGroup(group) {
    group.projects.forEach(item => {
        let project = createProjectElement(item)
        /* project.childNodes[0].lastChild.addEventListener('click', _=> {
            window.api.updateproject(item)
        })
        project.childNodes[2].addEventListener('click', _=> {
            window.api.openproject(item) 
        }) */
        project_list.append(project)
    })
}

function printGroupList() {
    group_list.innerHTML = '';
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
    let card = document.createElement('div', {is: 'sub-card'})
    card.setAttribute('name', project['name'])
    card.setAttribute('color', '#DD22FF')
    return card;
   /*  let div = builder.createElement('div', 'item', '');
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
    return div; */
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

document.getElementById('search-bar').addEventListener('input', _ => {
    let textSearched = document.getElementById('search-bar').value
    project_list.childNodes.forEach(element => {
        if (!element.firstChild.innerText.includes(textSearched)) {
            element.style.display = 'none'
        } else {
            element.style.display = 'block'
        }
    })
})

document.getElementById('group-all').addEventListener('click', _=> {
    printProjectList();
    printGroupList();
}) 