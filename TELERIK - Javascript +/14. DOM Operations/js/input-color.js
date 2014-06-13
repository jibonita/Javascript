function changeFontColor() {
    document.getElementById("area").style.color = arguments[0].value;
}

function changeBgrColor() {
    document.getElementById("area").style.background = arguments[0].value;
}

function changeColor() {
    document.getElementById("area").style[arguments[1]] = arguments[0].value;
}