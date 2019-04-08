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
    async getRemoteRepoURL(workingDir){
        let url = null;
        try{
            url = await gitP(workingDir).listRemote(['--get-url']);
        }catch(e){
            console.log(e);
        }
        return url;
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
    }
    
} 

