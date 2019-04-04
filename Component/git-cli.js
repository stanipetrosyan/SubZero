const git = require('simple-git/promise');

module.exports = {

    /**
     * @param {String} workingDir 
     */
    async isRepo(workingDir){
        let repo = null;
        try{
            repo = await git(workingDir).checkIsRepo();
        }catch(e){
            console.log(e);
        }
        return repo;
    },
    
    /**
     * @param {String} workingDir 
     */
    async status (workingDir) {
        let statusSummary = null;
        try {
           statusSummary = await git(workingDir).status();
        }catch (e) {
            console.log(e);
        }
        return statusSummary;
    }
    
} 

