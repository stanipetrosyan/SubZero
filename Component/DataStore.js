const Store = require('electron-store')

class DataStore extends Store{
    constructor(settings){

        super(settings)
        
        this.data = this.get('groups') || []
    }
    
    saveData(){
        this.set('groups', this.data);

        return this;
    }

    getData(){
        this.data = this.get('groups') || []

        return this;
    }

    /**
     * @param {object} group 
     */
    addGroup(group){
        if(this.getGroup(group.name) < 0){
            this.data = [...this.data, group];
            return this.saveData();
        }else{
            return false;
        }
    }

    /**
     * @param {string} group_name
     */
    deleteGroup(group_name){
        this.data = this.data.filter(elem => elem['name'] !== group_name)

        return this.saveData()
    }

    /**
     * @param {string} group_name 
     * @returns {number} index of group
     */
    getGroup(group_name){
        return this.data.findIndex(elem => elem['name'] == group_name);
    }

    /**
     * @param {object} project 
     */
    addProject(project){
        let index = this.getGroup(project['group']);
        this.data[index].projects.push(project);

        return this.saveData();
    }

    /**
     * @param {object} project 
     */
    removeProject(project){
        let index = this.getGroup(project['group']);
        this.data[index].projects = this.data[index].projects.filter(elem => elem['name'] !== project['name'])
        
        return this.saveData();
    }

    /**
     * @param { object } old 
     * @param { object } update 
     */
    updateProject(old, update){
        this.removeProject(old);
        this.addProject(update);
    }

    /**
     * @param { object } old 
     * @param { object } update 
     */
    updateGroup(old, update){
        let index = this.getGroup(old.name);
        this.data[index] = update;

        return this.saveData();
    }
}

module.exports = DataStore;