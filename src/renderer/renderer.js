'use strict'

const group_list = document.getElementById('group-list');
const project_list = document.getElementById('project-list');
const search_bar = document.getElementById('checkbox');
const menu = document.getElementById('menu');

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
        group.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            let menu = createContextMenu(event);
            let editAction = menu.children[0]
            let deleteAction = menu.children[1]

            editAction.addEventListener('click', _ => {
                window.groups.update(item['name'])
                menu.parentNode.removeChild(menu);
            })
            deleteAction.addEventListener('click', _ => {
                window.groups.delete(item['name'])
                menu.parentNode.removeChild(menu);
            })
            document.body.appendChild(menu);
        });
        group_list.appendChild(group)
    })
}

function createContextMenu(event) {
    let menu = document.createElement('ul');
    menu.setAttribute('id', 'menu');

    let editAction = document.createElement('li');
    editAction.innerText = "Edit";

    let deleteAction = document.createElement('li');
    deleteAction.innerText = "Delete";

    menu.appendChild(editAction);
    menu.appendChild(deleteAction);

    menu.style.top = `${event.clientY}px`;
    menu.style.left = `${event.clientX}px`;
    return menu;
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
        if (!element.getAttribute('name').includes(textSearched)) {
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

window.addEventListener('click', (event) => {
    let menu = document.getElementById('menu')
    if (menu) {
        const isClickedOutside = !menu.contains(event.target);
        if (isClickedOutside) { 
            menu.parentNode.removeChild(menu);
        }
    }
});