const key = 'groups';

module.exports = {
    /**
     * @param {object} group 
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
     */
    deleteGroup(group_name){
        this.data = this.data.filter(elem => elem['name'] !== group_name)

        return this.saveData()
    },

    /**
     * @param {object} project 
     */
    addProject(project){
        let index = this.findGroupByName(project['group']);
        this.data[index].projects.push(project);

        return this.saveData();
    },

    /**
     * @param {object} project 
     */
    removeProject(project){
        let index = this.findGroupByName(project['group']);
        this.data[index].projects = this.data[index].projects.filter(elem => elem['name'] !== project['name'])
        
        return this.saveData();
    },

    /**
     * @param { object } old 
     * @param { object } update 
     */
    updateProject(old, update){
        this.removeProject(old);
        this.addProject(update);
    },

    /**
     * @param { object } old 
     * @param { object } update 
     */
    updateGroup(old, update){
        let index = this.findGroupByName(old.name);
        this.data[index] = update;

        return this.saveData();
    },

    /**
     * @param {string} group_name 
     * @returns {number} index of group
     */
    findGroupByName(data, group_name){
        return data.findIndex(elem => elem['name'] == group_name);
    }
}