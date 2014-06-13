// number of DIVs to generate
var count = 10;
var rand = function(from, to) {
    return Math.floor(Math.random() * to) + from;
}
var radius = 0;

window.onload = generateBoxes;
var log = console.log;

function generateBoxes() {

    var contentDiv = document.getElementById("content");

    //** the circle that will define the divs rolling. We can remove the border and background settings to make it transparent
    var dvPath = document.createElement("div");
    dvPath.id = "circle-path";
    contentDiv.appendChild(dvPath);

    radius = dvPath.offsetHeight / 2;

    var docFragment = document.createDocumentFragment();

    for (var i = 0; i < count; i++) {
        var div = document.createElement("div");
        var dstyle = div.style;
        dstyle.background = getRandomColor();

        //** set some custom property called "grad" to keep the angle in which is the div positioned according to the circle
        div.grad = i * 360 / count;

        //** each of the DIVs will be positioned in different angle in the circle. 
        //** The angle depends on the number of the DIVs
        var angle = Math.PI * i * 2 / count;
        setPositionByAngle(dstyle, angle);

        docFragment.appendChild(div);

        //** start rolling of the div
        setInterval(roll, 100, div);

    }
    dvPath.appendChild(docFragment);

    return false;
}

function roll() {
    var args = arguments[0];
    args.grad++;

    var angle = (args.grad % 360) / 180 * Math.PI;
    setPositionByAngle(args.style, angle);

}

function setPositionByAngle(obj, angle) {
    var x = radius + Math.cos(angle) * radius;
    var y = radius - Math.sin(angle) * radius;
    obj.top = y + "px";
    obj.left = x + "px";
}

function stopRolling() {
    //** clear all setInterval-s
    for (var i = 1; i < 99999; i++)
        window.clearInterval(i);
}

function getRandomColor() {
    return "#" + rand(0, 255).toString(16) + rand(0, 255).toString(16) + rand(0, 255).toString(16);
}