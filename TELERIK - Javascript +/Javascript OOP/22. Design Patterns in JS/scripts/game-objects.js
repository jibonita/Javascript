var gameObject = (function() {
    function GameObject(positon, size) {
        this.position = {
            x: position.x,
            y: position.y
        };
        // we will use square cells
        this.cellSize = size;

    }

    function SnakePart() {
        this
    }

    SnakePart.prototype = new GameObject();
    SnakePart.prototype.constructor = SnakePart;

    function Snake(position, size, snakePartSize) {
        this.size = size;
        this.snakeBody = [];

        for (var i = 0; i < size; i++) {
            this.snakeBody.push(new SnakePart({
                x: position.x - i * snakePartSize,
                y: position.y
            }, snakePartSize));
        }

        return this;
    }

    Snake.prototype = new GameObject();
    Snake.prototype.constructor = Snake;

    Snake.prototype.move = function(direction) {
        // move all the elements from the last to the second at the position of the cell before them
        // i.e last-> set position of the 'before last', ..., third -> position of the 2nd, 2nd-> of the 1st
        for (var i = this.size - 1; i > 0; i--) {
            this.snakeBody[i].position = this.snakeBody[i - 1].position;
        };

        // the first element of the snake, i.e its head, will move according to the direction
        this.snakeBody[0].position = {
            x: this.snakeBody[0].position.x + direction.x,
            y: this.snakeBody[0].position.y + direction.y
        };
    }

    function Wall() {

    }

    function Food() {

    }


    return {

    };
})();