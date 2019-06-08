const git = require('simple-git/promise');

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
    },

    /**
     * @param {string} remote "https://${USER}:${PASS}@${REPO}"
     * @param {Array} options ['-u', 'origin', 'branch']
     */
    async push(workingDir, commit, remote, options){
        let log = null;
        try{
            await git(workingDir).add('.');
            await git(workingDir).commit(commit);
            log = await git(workingDir).push(remote, options);
        }catch(e){
            log = e;
        }
        return log;
    },
    
    /**
     * @param {string} workingDir 
     */
    async getAllBranches(workingDir){
        let list = null;
        try {
            list = await git(workingDir).branch(); 
        } catch (e) {
            list = e;
        }
        return list;
    }

} 

