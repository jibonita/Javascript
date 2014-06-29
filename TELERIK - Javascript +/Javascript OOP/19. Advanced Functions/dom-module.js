var domModule = (function() {


})();

function solve() {
    var arr = [];
    for (var i = 0; i < 10; i++) {
        arr[i] = function() {
            console.log(i);
        }
    }
    return arr;

}

var arr = solve();

for (var i = 10; i < 20; i++) {
    var currentFunc = arr[i - 10];
    currentFunc();

}