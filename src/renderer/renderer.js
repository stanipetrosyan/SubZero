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
        group.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            menu.style.top = `${e.clientY}px`;
            menu.style.left = `${e.clientX}px`;
            let editAction = createActionContextMenu('Edit');
            let deleteAction = createActionContextMenu('Delete')

            editAction.addEventListener('click', _ => {
                window.groups.update(item['name'])
            })
            deleteAction.addEventListener('click', _ => {
                window.groups.delete(item['name'])
            })

            menu.classList.remove('hidden');
            menu.appendChild(editAction);
            menu.appendChild(deleteAction);
            document.addEventListener('click', documentClickHandler);
        });
        group_list.appendChild(group)
    })
}


function documentClickHandler(e) {
    const isClickedOutside = !menu.contains(e.target);
    if (isClickedOutside) {
        menu.classList.add('hidden');
        document.removeEventListener('click', documentClickHandler);
    }
};

function createActionContextMenu(name) {
    let el = document.createElement('li');
    el.innerText = name;
    return el;
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