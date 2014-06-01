function changeColor() {
    var color = arguments[0].value;
    // change the body background
    document.getElementsByTagName("body")[0].style['background'] = color;
    // change the color of the help text with the inverted background color 
    document.getElementById('label').style.color = invertColor(color);
}

function invertColor(color) {
    var r, g, b,
        invertedColor;
    // get Red, Green and Blue values of the hex color
    if (color.indexOf('#') === 0) {
        r = color.substring(1, 3);
        g = color.substring(3, 5);
        b = color.substring(5);
    } else {
        r = color.substring(0, 2);
        g = color.substring(2, 4);
        b = color.substring(4);
    }

    invertedColor = '#' + (255 - parseInt(r, 16)).toString(16) +
        (255 - parseInt(g, 16)).toString(16) +
        (255 - parseInt(b, 16)).toString(16);
    return invertedColor;
}