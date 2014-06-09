// if (!document.querySelector) {
//     document.querySelector = function(selectors) {
//         return querySelector(selectors);
//     }
// }

// http://www.w3schools.com/cssref/css_selectors.asp

var log = console.log;

var querySelector = function(elementSelector) {

    //TODO........: remove double spacing in elementSelector
    // > ignores spaces before and after
    // : pseudo class does not allow space before and after

    var selectors = elementSelector.split(' '),
        objects = [],
        selector;

    for (var i = 0; i < selectors.length; i++) {
        selector = selectors[i];

        //** check the first symbol if special
        var firstSymbol = selector[0];
        switch (firstSymbol) {
            case '#':

            case '.':
        }
    }

    console.log(selectors)
}

//#._
var sel = '#red div a:hover';
querySelector(sel)