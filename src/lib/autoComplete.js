const builder = require('./Builder'); 

module.exports = {
  /**
   * set auto complete method to an input field
   * @param {HTMLInputElement} element 
   * @param {Array} data
   */
  autocomplete(element, data) {
    var currentFocus;
    element.addEventListener("input", function(e) {
        var val = this.value;
        closeAllLists();
        if (!val) { 
            return false;
        }
        currentFocus = -1;
        let div_items = builder.createElement('div', 'autocomplete-items', '', this.id + 'autocomplete-list');
        this.parentNode.appendChild(div_items);

        for (let i = 0; i < data.length; i++) {
          if (data[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            let innerItem = '<strong>' + data[i].substr(0, val.length) + '</strong>' + data[i].substr(val.length) +"<input type='hidden' value='" + data[i] + "'>";
            let item = builder.createElement('div', '', innerItem);
            item.addEventListener("click", function(e) {
                element.value = this.getElementsByTagName("input")[0].value;
                closeAllLists();
            });
            div_items.appendChild(item);
          }
        }
    });
    element.addEventListener("keydown", function(e) {
        var item = document.getElementById(this.id + "autocomplete-list");
        if (item)  
            item = item.getElementsByTagName("div");
        if (e.keyCode == 40) { // DOWN key
          currentFocus++;
          addActive(item, currentFocus);
        } 
        else if (e.keyCode == 38) { // UP key
          currentFocus--;
          addActive(item, currentFocus);
        } 
        else if (e.keyCode == 13) { // ENTER key
          e.preventDefault();
          if (currentFocus > -1) {
              item[currentFocus].click();
          }
        }
    });
  }
}

/**
 * function to classify an item as "active"
 * @param {HTMLInputElement} element
 */
function addActive(element, currentFocus) {
    if (!element) return false;
    removeActive(element);
    if (currentFocus >= element.length)
        currentFocus = 0;
    if (currentFocus < 0) 
        currentFocus = (element.length - 1);
    element[currentFocus].classList.add("autocomplete-active");
}

/**
 * function to remove the "active" class from all autocomplete items
 * @param {HTMLInputElement} element
 */
function removeActive(element) {
    for (let i = 0; i < element.length; i++) {
        element[i].classList.remove("autocomplete-active");
    }
}

/**
 * close all autocomplete lists in the document, except the one passed as an argument
 * @param {*} selected
 */
function closeAllLists(selected) {
    var list = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < list.length; i++) {
        if (selected != list[i]) {
            list[i].parentNode.removeChild(list[i]);
        }
    }
}
