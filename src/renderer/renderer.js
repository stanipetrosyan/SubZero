'use strict'

const group_list = document.getElementById('group-list');
const project_list = document.getElementById('project-list');
const search_bar = document.getElementById('checkbox');

let data = window.request.data();
printProjectList()
printGroupList();
setTheme(window.request.theme());

setInterval(refresh, 1000)

function refresh() {
    setTheme(window.request.theme());
    let data_requested = window.request.data();
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
        group.addEventListener('click', _ => {
            project_list.innerHTML = '';
            printProjectForGroup(item);
        })
        group_list.appendChild(group)
    })
}

function createProjectElement(project) {
    let card = document.createElement('sub-project')
    card.setAttribute('name', project['name'])
    card.setAttribute('color', '#DD22FF')
    return card;
}

function createGroupElement(group) {
    let div = document.createElement('sub-group')
    div.setAttribute('name', group['name']);
    div.setAttribute('color', group['color'])
    return div;
}

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