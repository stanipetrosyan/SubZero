'use strict'

const group_list = document.getElementById('group-list');
const project_list = document.getElementById('project-list');
const search_bar = document.getElementById('checkbox');

let data = window.api.request();
printProjectList()
printGroupList();
setTheme(window.api.themerequest());

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
        project_list.append(createProjectElement(item))
    })
}

function printGroupList() {
    group_list.innerHTML = '';
    data.forEach(item => {
        let group = createGroupElement(item)
       /*  group.childNodes[1].addEventListener('click', _=> {
            project_list.innerHTML = '';
            printProjectForGroup(item);
        })
        group.childNodes[2].addEventListener('click', _=> {
            window.api.updategroup(item)
        }) */
        group_list.appendChild(group)
    })
}

function createProjectElement(project) {
    let card = document.createElement('div', {is: 'sub-card'})
    card.setAttribute('name', project['name'])
    card.setAttribute('color', '#DD22FF')
    return card;
}

function createGroupElement(group) {
    let div = document.createElement('div', {is: 'sub-group'})
    div.setAttribute('name', group['name']);
    div.setAttribute('color', group['color'])
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