const gitP = require('simple-git/promise');
const git = require('simple-git');

module.exports = {

    /**
     * @param {string} workingDir 
     */
    async isRepo(workingDir){
        let repo = null;
        try{
            repo = await gitP(workingDir).checkIsRepo();
        }catch(e){
            console.log(e);
        }
        return repo;
    },
    
    /**
     * @param {string} workingDir 
     */
    async status (workingDir) {
        let statusSummary = null;
        try {
           statusSummary = await gitP(workingDir).status();
        }catch (e) {
            console.log(e);
        }
        return statusSummary;
    },

    /**
     * @param {string} workingDir 
     * @returns {string}
     */
    getRemoteRepoURL(workingDir){
        git(workingDir).listRemote(['--get-url'], (err, data) =>{
            if(!err){
                return data;
            }
        })
    },

    /**
     * @param {string} workingDir 
     * @returns {object} object array
     */
    getCommitList(workingDir){
        require('simple-git')(workingDir)
        .log((err, log) => {
            return log;
        })
    }, 
    
} 

