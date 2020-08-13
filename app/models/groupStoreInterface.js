'use strict'

const key = 'groups';

class GroupsStoreInterface {
    constructor(store) {
        this.store = store;
       // super(options);
    }

    /**
     * @param {object} group
     */
    addGroup(group) {
        let groups = this.store.get(key);
        if(findGroupByName(groups, group.name) < 0) {
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
        let groups = this.get(key);
        let index = findGroupByName(groups, old.name);
        groups[index] = update;
        this.store.set(key, groups);
    }
    
    getGroupByName(name) {
        let groups = this.store.get(key);
        return groups[findGroupByName(groups, name)];
    }
    
    /**
     * @param {object} project 
     */
    addProject(project) {
        let groups = this.store.get(key);
        let index = findGroupByName(groups, project['group']);
        groups[index].projects.push(project);
        this.store.set(groups);
    }

    /**
     * @param {object} project 
     */
    removeProject(project) {
        let groups = this.store.get(key);
        let index = findGroupByName(groups, project['group']);
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
        let groups = this.store.get(key);
        for (let group of groups) {
            for (let project of group['projects']) {
                if (project['name'] == name ) {
                    return project;
                }
            }
        }
        return null;
    }
}

function findGroupByName(data, group_name) {
    return data.findIndex(elem => elem['name'] == group_name);
}

function removeGroupByName(data, group_name) {
    return data.filter(elem => elem['name'] !== group_name)
}

function removeProjectByName(data, project_name) {
    return data.projects.filter(elem => elem['name'] !== project_name)
}

module.exports = GroupsStoreInterface;
