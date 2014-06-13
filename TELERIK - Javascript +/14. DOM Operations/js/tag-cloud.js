var tags = ["cms", "css", "javascript", "web", "js", "ASP.NET MVC", ".net", ".net", "wordpress", "xaml", "js", "http", "asp.net", "asp.net MVC", "ASP.NET MVC", "wp", "javascript", "js", "cms", "html", "javascript", "http", "http", "CMS"]

var tagCloud = generateTagCloud(tags, 17, 42);


function generateTagCloud(list, minFont, maxFont) {
    var wordToFontSize = assignFontSize(list, minFont, maxFont);

    var container = document.getElementById("cloud-container");

    var fragment = document.createDocumentFragment();

    for (var word in wordToFontSize) {
        var newWord = document.createElement("div");
        newWord.innerHTML = word;
        newWord.style.fontSize = wordToFontSize[word] + "px";
        fragment.appendChild(newWord);
    }
    container.appendChild(fragment);

}

function assignFontSize(list, minFont, maxFont) {
    var wordOccs = findOccurrences(list);
    var fontToOcc = setFontToOccurrency(wordOccs, minFont, maxFont);

    for (var word in wordOccs) {
        wordOccs[word] = fontToOcc[wordOccs[word]];
    }
    return wordOccs;
}

function findOccurrences(list) {
    var word;
    var occurrencyTable = {};

    list.forEach(function(word) {
        word = word.toLowerCase();
        occurrencyTable[word] = (occurrencyTable[word] || 0) + 1;
    });

    return occurrencyTable;
}

function setFontToOccurrency(wordOccs, minFont, maxFont) {
    var occsCount = getOccurrencesCount(wordOccs);
    var occsList = getSortedKeys(occsCount);
    var differentWords = Object.keys(occsCount).length;

    var fontToOcc = {};
    for (occ in occsList) {
        fontToOcc[occsList[occ]] = minFont + occ * (maxFont - minFont) / (differentWords - 1);
    }
    return fontToOcc;
}

function getOccurrencesCount(list) {
    var group = {};

    for (word in list) {
        group[list[word]] = (group[list[word]] || 0) + 1;
    }
    return group;
}

function getSortedKeys(obj) {
    var keys = [];
    for (var key in obj) keys.push(key);
    return keys.sort(function(a, b) {
        return a - b
    });
}