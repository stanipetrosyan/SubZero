const dialog = require('electron').remote.dialog;
const config = require('../../config')

module.exports = {

    /**
     * @returns { boolean }
     */
    showQuestionMessageBox(){
        let options = config('question');
        return dialog.showMessageBox(null, options);
    }, 
    showErrorMessageBox(){
        let options = config('error');
        dialog.showMessageBox(null, options);
    }
}
