'use strict'

const groupList = document.getElementById('group-list');
const projectList = document.getElementById('project-list');
const activeSearchBar = document.getElementById('checkbox');
const searchBar = document.getElementById('search-bar')
const emptyProjectsInfo = document.getElementById('projects-info');

let data = null;
refresh();

setInterval(refresh, 1000)

function refresh() {
    setTheme(window.request.theme());
    const dataRequested = window.request.data();
    if (data == null || JSON.stringify(data) !== JSON.stringify(dataRequested)) {
        data = dataRequested;
        projectsIsEmpty(data) ? emptyProjectsInfo.style.visibility = 'visible' : emptyProjectsInfo.style.visibility = 'hidden';
        printProjectList();
        printGroupList();
    }
}

function printProjectList() {
    projectList.innerHTML = '';
    data.forEach(element => {
        printProjectForGroup(element);
    });
}

function printProjectForGroup(group) {
    group.projects.forEach(item => {
        const project = createProjectElement(item);
        project.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            const menu = createContextMenu(event);
            const editAction = menu.children[0]
            const deleteAction = menu.children[1]

            editAction.addEventListener('click', _ => {
                window.projects.update(item['name'])
                menu.parentNode.removeChild(menu);
            })
            deleteAction.addEventListener('click', _ => {
                window.projects.delete(item['name'])
                menu.parentNode.removeChild(menu);
            })
            document.body.appendChild(menu);
        });

        projectList.appendChild(project);
    })
}

function printGroupList() {
    groupList.innerHTML = '';
    data.forEach(item => {
        const group = createGroupElement(item)
        group.addEventListener('click', _ => {
            projectList.innerHTML = '';
            printProjectForGroup(item);
        })
        group.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            const menu = createContextMenu(event);
            const editAction = menu.children[0]
            const deleteAction = menu.children[1]

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
        groupList.appendChild(group)
    })
}

function createContextMenu(event) {
    const menu = document.createElement('ul');
    menu.setAttribute('id', 'menu');

    const editAction = document.createElement('li');
    editAction.innerText = 'Edit';

    const deleteAction = document.createElement('li');
    deleteAction.innerText = 'Delete';

    menu.appendChild(editAction);
    menu.appendChild(deleteAction);
    const menuPositionX = event.clientX;
    const menuPositionY = (event.clientY > (window.innerHeight - 100)) ? event.clientY - 100 : event.clientY;

    menu.style.top = `${menuPositionY}px`;
    menu.style.left = `${menuPositionX}px`;

    return menu;
}

function createProjectElement(project) {
    const card = document.createElement('sub-project');
    card.setAttribute('name', project['name'])
    return card;
}

function createGroupElement(group) {
    const div = document.createElement('sub-group')
    div.setAttribute('name', group['name']);
    div.setAttribute('color', group['color'])
    return div;
}

function projectsIsEmpty(data) {
    for (const group of data) {
        if (group.projects.length > 0) {
            return false
        }
    }
    return true
}

function setSearchBar() {
    activeSearchBar.checked = !activeSearchBar.checked;
    (activeSearchBar.checked === true) ? searchBar.removeAttribute('disabled') : searchBar.setAttribute('disabled', 'disabled')
}

searchBar.addEventListener('input', _ => {
    if (activeSearchBar.checked) {
        const textSearched = document.getElementById('search-bar').value.toUpperCase();
        projectList.childNodes.forEach(element => {
            if (!element.getAttribute('name').toUpperCase().includes(textSearched)) {
                element.style.display = 'none'
            } else {
                element.style.display = 'block'
            }
        })
    }
})

document.getElementById('group-all').addEventListener('click', _ => {
    printProjectList();
    printGroupList();
})

window.addEventListener('click', (event) => {
    const menu = document.getElementById('menu')
    if (menu) {
        const isClickedOutside = !menu.contains(event.target);
        if (isClickedOutside) {
            menu.parentNode.removeChild(menu);
        }
    }
});
