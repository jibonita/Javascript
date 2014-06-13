// number of DIVs to generate
var count = 50;
var rand = function(from, to) {
    return Math.floor(Math.random() * to) + from;
}

window.onload = generateBoxes;

function generateBoxes() {

    var contentDiv = document.getElementById("content");

    var docFragment = document.createDocumentFragment();

    for (var i = 0; i < count; i++) {
        var div = document.createElement("div");
        div.innerHTML = "<strong>div</strong>";

        var dstyle = div.style;

        var height = rand(20, 100);
        dstyle.height = height + "px";
        dstyle.width = rand(20, 100) + "px";
        dstyle.lineHeight = height + "px";

        // avoid positioning the div very bottom or right which would cause a scrollbar
        dstyle.top = rand(0, getHeight() - height - 20) + "px";
        dstyle.left = rand(0, getWidth() - parseInt(dstyle.width) - 20) + "px";

        dstyle.background = getRandomColor();
        dstyle.color = getRandomColor();

        dstyle.borderRadius = rand(5, height) + "px";
        dstyle.borderColor = getRandomColor();
        dstyle.borderWidth = rand(1, 15) + "px";

        docFragment.appendChild(div);
    }
    contentDiv.appendChild(docFragment);

    return false;
}

function getRandomColor() {
    return "#" + rand(0, 255).toString(16) + rand(0, 255).toString(16) + rand(0, 255).toString(16);
}