var movingShapes = (function() {
    var height = 40;
    var width = 40;


    function addMovingShape(moveType, container) {
        var element = createElement();
        if (!container) container = "body";
        document.querySelector(container).appendChild(element);

        setInitialTopLeft(element);

        if (moveType == "ellipse") {
            element.style.borderRadius = height / 2 + "px";
            addEllipseMoving(element);
        } else {
            //default
            addRectangularMoving(element);
        }
    }

    function createElement() {
        var div = document.createElement("div");
        div.className = "moving-shape";

        div = setStyles(div);

        return div;
    }

    function addEllipseMoving(div) {
        div.grad = 0;
        div.radiusA = rand(height, height * 3);
        div.radiusB = rand(width * 2, width * 4);

        //** start rolling of the div
        setInterval(roll, rand(5, 20), div);
    }

    function roll() {
        var args = arguments[0];
        args.grad++;

        var angle = (args.grad % 360) / 180 * Math.PI;
        setPositionByAngle(args, angle);

    }

    function setPositionByAngle(obj, angle) {

        var x = obj.radiusA + Math.cos(angle) * obj.radiusA;
        var y = obj.radiusB - Math.sin(angle) * obj.radiusB;

        obj.style.left = x + "px";
        obj.style.top = y + "px";
    }

    function addRectangularMoving(div) {
        // initial direction -> to the bottom
        div.dirTop = 1;
        div.dirLeft = 0;

        // will move clockwise
        div.startTop = parseInt(div.style.top);
        div.pathTop = div.startTop + rand(height, height * 3);
        div.startLeft = parseInt(div.style.left);
        div.pathLeft = div.startLeft - rand(width * 2, width * 4);

        setInterval(rectWalk, rand(5, 20), div);
    }


    function rectWalk() {
        var div = arguments[0];
        var dStyle = div.style;

        getRectDirection(div);

        dStyle.top = parseInt(dStyle.top) + div.dirTop + "px";
        dStyle.left = parseInt(dStyle.left) + div.dirLeft + "px";

    }

    function setStyles(div) {
        var dstyle = div.style;
        dstyle.height = height + "px";
        dstyle.width = width + "px";
        dstyle.background = getRandomColor();
        dstyle.border = "2px solid " + getRandomColor();

        return div;
    }

    function setInitialTopLeft(obj) {
        var parent = obj.parentNode;
        if (parent.nodeName.toLowerCase() == "body") {
            obj.style.top = rand(0, getHeight() / 2) + "px";
            obj.style.left = rand(0, getWidth() / 2) + "px";
        } else {
            obj.style.top = rand(0, parent.offsetHeight / 2) + "px";
            obj.style.left = rand(0, parent.offsetWidth / 2) + "px";
        }
    }

    function getRectDirection(div) {
        var dStyle = div.style;
        switch (div.dirTop + "" + div.dirLeft) {
            case '10':
                if (parseInt(dStyle.top) > div.pathTop) {
                    //move left
                    div.dirTop = 0;
                    div.dirLeft = -1;
                }
                break;
            case '0-1':
                if (parseInt(dStyle.left) < div.pathLeft) {
                    // move top
                    div.dirTop = -1;
                    div.dirLeft = 0;
                }
                break;
            case '-10':
                if (parseInt(dStyle.top) < div.startTop) {
                    // move right
                    div.dirTop = 0;
                    div.dirLeft = 1;
                }
                break;
            case '01':
                if (parseInt(dStyle.left) > div.startLeft) {
                    // move bottom
                    div.dirTop = 1;
                    div.dirLeft = 0;
                }
        }
    }

    function getRandomColor() {
        return "#" + rand(0, 255).toString(16) + rand(0, 255).toString(16) + rand(0, 255).toString(16);
    }

    return {
        add: addMovingShape
    };
})();


var rand = function(from, to) {
    return Math.floor(Math.random() * to) + from;
};


// get browser width and height. I copied these functions from Internet
function getWidth() {
    var x = 0;
    if (self.innerHeight) {
        x = self.innerWidth;
    } else if (document.documentElement && document.documentElement.clientHeight) {
        x = document.documentElement.clientWidth;
    } else if (document.body) {
        x = document.body.clientWidth;
    }
    return x;
}

function getHeight() {
    var y = 0;
    if (self.innerHeight) {
        y = self.innerHeight;
    } else if (document.documentElement && document.documentElement.clientHeight) {
        y = document.documentElement.clientHeight;
    } else if (document.body) {
        y = document.body.clientHeight;
    }
    return y;
}