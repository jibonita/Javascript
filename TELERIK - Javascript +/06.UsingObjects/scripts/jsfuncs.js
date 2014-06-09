/* Task 1 - Points & Lines in Coordinate system */
function Point(x, y) {
    this.x = x;
    this.y = y;

    this.distance = function(point) {
        var dx = this.x - point.x,
            dy = this.y - point.y;
        return Math.sqrt(dx * dx + dy * dy);
    };

    this.toString = function() {
        return 'Point(' + this.x + ',' + this.y + ')';
    }
}

function Line(p1, p2) {
    this.begin = p1;
    this.end = p2;

    this.formsTriangleWith = function(line2, line3) {
        var line1Length = this.begin.distance(this.end),
            line2Length = line2.begin.distance(line2.end),
            line3Length = line3.begin.distance(line3.end);

        //The condition to have 3 segments with lengths a, b and c, to form a triangle is: 
        // a + b > c &&  a + c > b && b + c > a
        return (line1Length + line2Length > line3Length &&
            line1Length + line3Length > line2Length &&
            line2Length + line3Length > line1Length);

    };

    this.toString = function() {
        return 'Line[ ' + this.begin + ',' + this.end + ' ]';
    };
}

/* Task 2 - Add remove method to the array type */
Array.prototype.remove = function(element) {


    for (var i = this.length - 1; i >= 0; i--) {
        if (this[i] === element) {
            this.splice(i, 1);
        };
    };
}

/* Task 3 - Deep copy of an object */
function Copy(obj) {
    var newObj;

    if (typeof obj != "object") {
        newObj = obj;
    } else {
        //** check if the object is array
        var isArray = false;
        if (Array.isArray) {
            //** this method may not work in all browsers but they say it is the fastest
            isArray = Array.isArray(obj);
        } else {
            isArray = (Object.prototype.toString.call(obj) === '[object Array]');
        }
        if (isArray) {
            newObj = new Array();
            for (var i = 0; i < obj.length; i++) {
                newObj[i] = Copy(obj[i]);
            }
        } else {
            newObj = new Object();
            for (prop in obj) {
                newObj[prop] = obj[prop];
            }
        }

    }
    return newObj;
}

/* Task 4 - hasProperty */
function hasProperty(obj, prop) {
    return obj.hasOwnProperty(prop);
}

/* Task 5 -findYoungest */
function findYoungest(arr) {
    if (arr.length > 0) {
        var minAge = arr[0];
        for (var i = 1; i < arr.length; i++) {
            if (minAge.age > arr[i].age) {
                minAge = arr[i];
            }
        }
        return minAge.firstname + " " + minAge.lastname;
    }
}

/* Task 6 - group students */
function printPerson(obj) {
    return "{firstname: '" + obj.firstname + "', lastname: '" + obj.lastname + "', age: " + obj.age + "}";
}

function groupBy(arr, cond) {
    var grouped = {};
    arr.forEach(function(item) {

        //** key is item[cond]
        //** if no such key - add initial new Array value to it. 
        if (!grouped[item[cond]]) {
            grouped[item[cond]] = new Array();
        }

        //** add item to the "value" array
        grouped[item[cond]].push(item);

    });
    return grouped;
}