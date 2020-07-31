'use strict'

const Store = require('./store')

const key = 'groups';


class GroupsStoreInterface extends Store {
    constructor(options) {
        super(options);
    }

    /**
     * @param {object} group
     */
    addGroup(group) {
        let groups = this.get(key);
        if(findGroupByName(groups, group.name) < 0) {
            groups.push(group);
            this.set(key, groups);
        } else {
            return false;
        }
    }

    /**
     * @param {object} group
     */
    removeGroup(group) {
        this.set(key, removeGroupByName(this.get(key), group['name']));
    }

    /**
     * @param {object} old 
     * @param {object} update 
     */
    updateGroup(old, update) {
        let groups = this.get(key);
        let index = findGroupByName(groups, old.name);
        groups[index] = update;
        this.set(key, groups);
    }
    
    getGroupByName(name) {
        let groups = this.get(key);
        return groups[findGroupByName(groups, name)];
    }
    
    /**
     * @param {object} project 
     */
    addProject(project) {
        let groups = this.get(key);
        let index = findGroupByName(groups, project['group']);
        groups[index].projects.push(project);
        this.set(groups);
    }

    /**
     * @param {object} project 
     */
    removeProject(project) {
        let groups = this.get(key);
        let index = findGroupByName(groups, project['group']);
        groups[index].projects = removeProjectByName(groups[index], project['name'])
        this.set(key, groups);
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
        let groups = this.get(key);
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
