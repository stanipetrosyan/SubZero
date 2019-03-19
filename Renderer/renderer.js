const DataStore = require('../Component/DataStore');

const groupData = new DataStore({name: 'Groups Main'})

document.getElementById('add').addEventListener('click', () =>{

    let group = {
        name: "desktop2",
        color: "red",
        projects : []
    }
    groupData.deleteGroup("desktop");

    console.log(groupData.getData().data);
})
