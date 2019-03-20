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
    addGroup(group){
        this.data = [...this.data, group];

        return this.saveData();
    }
    deleteGroup(group){
        this.data = this.data.filter(elem => elem.name !== group)

        return this.saveData()
    }
}

module.exports = DataStore;