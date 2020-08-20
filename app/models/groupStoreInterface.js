'use strict'

const key = 'groups';

class GroupsStoreInterface {
    constructor(store) {
        this.store = store;
    }

    /**
     * @param {object} group
     */
    addGroup(group) {
        const groups = this.store.get(key);
        if (findGroupByName(groups, group.name) < 0) {
            groups.push(group);
            this.store.set(key, groups);
        } else {
            return false;
        }
    }

    /**
     * @param {object} group
     */
    removeGroup(group) {
        this.store.set(key, removeGroupByName(this.store.get(key), group['name']));
    }

    /**
     * @param {object} old
     * @param {object} update
     */
    updateGroup(old, update) {
        const groups = this.get(key);
        const index = findGroupByName(groups, old.name);
        groups[index] = update;
        this.store.set(key, groups);
    }

    getGroupByName(name) {
        const groups = this.store.get(key);
        return groups[findGroupByName(groups, name)];
    }

    /**
     * @param {object} project
     */
    addProject(project) {
        const groups = this.store.get(key);
        const index = findGroupByName(groups, project['group']);
        groups[index].projects.push(project);
        this.store.set(groups);
    }

    /**
     * @param {object} project
     */
    removeProject(project) {
        const groups = this.store.get(key);
        const index = findGroupByName(groups, project['group']);
        groups[index].projects = removeProjectByName(groups[index], project['name'])
        this.store.set(key, groups);
    }

    /**
     * @param { object } old
     * @param { object } update
     */
    updateProject(old, update) {
        this.removeProject(old);
        this.addProject(update);
    }

    getProjectByName(name) {
        const groups = this.store.get(key);
        for (const group of groups) {
            for (const project of group['projects']) {
                if (project['name'] === name) {
                    return project;
                }
            }
        }
        return null;
    }
}

function findGroupByName(data, groupName) {
    return data.findIndex(elem => elem['name'] === groupName);
}

function removeGroupByName(data, groupName) {
    return data.filter(elem => elem['name'] !== groupName)
}

function removeProjectByName(data, projectName) {
    return data.projects.filter(elem => elem['name'] !== projectName)
}

module.exports = GroupsStoreInterface;
