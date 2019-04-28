const git = require('simple-git/promise');
//const git = require('simple-git');

module.exports = {

    /**
     * @param {string} workingDir
     * @returns {Promise} 
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
     * @param {string} workingDir 
     * @returns {Promise}
     */
    async status (workingDir) {
        let statusSummary = null;
        try {
           statusSummary = await git(workingDir).status();
        }catch (e) {
            console.log(e);
        }
        return statusSummary;
    },

    /**
     * @param {string} workingDir 
     * @returns {Promise}
     */
    async getRemoteRepoURL(workingDir){
        let url = null;
        try{
            url = await git(workingDir).listRemote(['--get-url']);
        }catch(e){
            console.log(e);
        }
        return url;
    },

    /**
     * @param {string} workingDir 
     * @returns {object} object array
     */
    async getCommitList(workingDir){
        let log = null;
        try{
            log = await git(workingDir).log();
        }catch(e){
            console.log(e);
        }
        return log;
    }
    
} 

