function selectDirectDivsQS() {
    // Select all DIV elements that are directly inside other div elements
    var allDivs = document.querySelectorAll('div>div');

    //** Lets put red border to all these div elements
    for (obj in allDivs) {
        paintInColor(allDivs[obj], 'red');
    }

    return allDivs;
}

function selectDirectDivsTN() {
    var allDivs = document.getElementsByTagName('div'),
        directDIVs = [],
        parent,
        len = allDivs.length;

    //** for each div in the allDives object we should check if its parent is also a div
    for (var item = 0; item < len; item++) {
        parent = allDivs[item].parentNode;
        if (parent.tagName.toLowerCase() === 'div') {
            directDIVs.push(allDivs[item]);

            //** Lets put green border to all these div elements
            paintInColor(allDivs[item], 'green');
        }
    }

    return directDIVs;
}

function paintInColor(el, color) {
    if (el.style) {
        el.style.border = '1px solid ' + color;
    }
}