function solve(args) {
    //** define the 8 directions of movement
    var directions = {
        1: {
            x: -2,
            y: 1
        },
        2: {
            x: -1,
            y: 2
        },
        3: {
            x: 1,
            y: 2
        },
        4: {
            x: 2,
            y: 1
        },
        5: {
            x: 2,
            y: -1
        },
        6: {
            x: 1,
            y: -2
        },
        7: {
            x: -1,
            y: -2
        },
        8: {
            x: -2,
            y: -1
        }
    };

    //** read input data
    var rows = args[0].split(' ')[0] | 0,
        cols = args[0].split(' ')[1] | 0;
    var playField = [];

    for (var r = 0; r < rows; r++) {
        playField[r] = [];
        for (var c = 0; c < cols; c++) {
            playField[r][c] = args[r + 1][c] | 0;
        }
    }
    //** start position at the bottom-right cell 
    var currentPos = {
        x: rows - 1,
        y: cols - 1
    };
    var sum = 0,
        jumps = 0,
        newPos,
        jumps = 1,
        weedSum = getCellWeed(currentPos);

    while (true) {
        var dir = playField[currentPos.x][currentPos.y];
        //console.log('dir:' + dir);
        //console.log(directions[dir]);

        var moveX = directions[dir].x,
            moveY = directions[dir].y;

        //** mark cell as visited
        playField[currentPos.x][currentPos.y] = -1;
        newPos = {
            x: currentPos.x + moveX,
            y: currentPos.y + moveY
        };

        if (isInsideField(newPos)) {
            if (playField[newPos.x][newPos.y] === -1) {
                return 'Sadly the horse is doomed in ' + jumps + ' jumps';
            }
            //** mark cell as visited
            //playField[newPos.x][newPos.y] = -1;
            weedSum += getCellWeed(newPos);
        } else {
            return 'Go go Horsy! Collected ' + weedSum + ' weeds';
        }
        //console.log(newPos)
        //console.log()

        currentPos = newPos;
        jumps++;
    }

    //console.log(currentPos)

    function isInsideField(pos) {
        if (pos.x < 0 || pos.x > rows - 1 || pos.y < 0 || pos.y > cols - 1) {
            return false;
        }
        return true;
    }

    function getCellWeed(pos) {
        return Math.pow(2, pos.x) - pos.y;
    }
}


var input = ['3 5 ', '54561 ', '43328 ', '52388 '];
input = args = [
    '3 5',
    '54361',
    '43326',
    '52888',
];

console.log(solve(input));