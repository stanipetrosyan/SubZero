const builder = require('./Builder');


// MUST REFACTORING
module.exports = {

    /**
     * @param {string} type of input
     * @param {string} label 
     */
    createDialog(type, label){
        var str = '<form method="dialog">\
                    <div class="input-position">\
                    <input id="val" type="'+ type+'" required>\
                    <span class="highlight"></span>\
                    <span class="bar"></span>\
                    <label>'+ label+ '</label>\
                    </div>\
                    <button class="button" id="submit" type="submit">OK</button>\
                    </form>'
        let dialog = builder.createElement('dialog', '', str);
        dialog.appendChild(input);
        return dialog;
    }
}