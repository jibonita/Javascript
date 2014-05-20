String.prototype.htmlEscape = function() {
    var escapedStr = String(this).replace(/&/g, '&amp;');
    escapedStr = escapedStr.replace(/</g, '&lt;');
    escapedStr = escapedStr.replace(/>/g, '&gt;');
    escapedStr = escapedStr.replace(/"/g, '&quot;');
    escapedStr = escapedStr.replace(/'/g, "&#39");
    return escapedStr;
}

Object.prototype.toString = function() {
    var item;
    var result = '{';
    for (item in this)
        result += item + ":" + this[item] + ", ";

    return result.substr(0, result.length - 2) + '}';
}