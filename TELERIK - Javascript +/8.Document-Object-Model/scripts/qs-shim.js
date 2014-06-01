if (!document.querySelector) {
    document.querySelector = function(selectors) {
        return querySelector(selectors);
    }
}

var log = console.log;

var querySelector = function(selector) {

}