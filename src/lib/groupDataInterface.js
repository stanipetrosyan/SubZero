const key = 'groups';

module.exports = {

    /**
     * @param {object} group
     * @param {Array} store
     */
    addGroup(group, store){
        let groups = store.get(key);
        if(this.findGroupByName(groups, group.name) < 0) {
            groups.push(group);
            store.set(key, groups);
        } else {
            return false;
        }
    },

    /**
     * @param {string} group_name
     * @param {Array} store
     */
    removeGroup(group_name, store){
        store.set(key, removeGroupByName(store.get(key), group_name));
    },

    /**
     * @param { object } old 
     * @param { object } update 
     * @param {Array} store
     */
    updateGroup(old, update, store){
        let groups = store.get(key);
        let index = this.findGroupByName(groups, old.name);
        groups[index] = update;
        store.set(key);
    },

    /**
     * @param {Array} datas
     * @param {string} group_name 
     * @returns {number} index of group
     */
    findGroupByName(data, group_name){
        return data.findIndex(elem => elem['name'] == group_name);
    },

    /**
     * @param {Array} data 
     * @param {string} group_name 
     * @returns {Array} data without element
     */
    removeGroupByName(data, group_name) {
        return data.filter(elem => elem['name'] !== group_name)
    },
    
    /**
     * @param {object} project 
     */
    addProject(project, store){
        let groups = store.get(key);
        let index = this.findGroupByName(groups, project['group']);
        groups[index].projects.push(project);
        store.set(groups);
    },

    /**
     * @param {object} project 
     */
    removeProject(project, store){
        let index = this.findGroupByName(project['group']);
        let groups = store.get(key);
        groups[index].projects = this.removeProjectByName(groups[index], project['name'])
        store.set(key, groups);
    },

    removeProjectByName(data, project_name) {
        return data.projects.filter(elem => elem['name'] !== project_name)
    },

    /**
     * @param { object } old 
     * @param { object } update 
     */
    updateProject(store, old, update){
        this.removeProject(old, store);
        this.addProject(update, store);
    }
}