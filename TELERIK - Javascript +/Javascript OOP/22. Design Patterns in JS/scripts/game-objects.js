define(['constants'], function(Settings) {
    var directions = Settings.directions,
        CELL_SIZE = Settings.CELL_SIZE;

    var gameObject = (function() {
        function GameObject(position, size) {
            this.position = position;
            // we will use square cells
            this.cellSize = size;
        }

        GameObject.prototype = {
            getPosition: function() {
                return this.position;
            }
        };

        function SnakePart(position, size) {
            GameObject.call(this, position, size);
        }

        SnakePart.prototype = new GameObject();
        SnakePart.prototype.constructor = SnakePart;

        var Snake = (function() {
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

            Snake.prototype.getMovePosition = function(direction) {
                var head = this.snakeBody[0],
                    firstPart = this.snakeBody[1];


                if (head.getPosition().y === firstPart.getPosition().y) {
                    // prevent the snake to move left when it's body stays to the left of the head    
                    if (head.getPosition().x > firstPart.getPosition().x && direction == directions.left) {
                        // no move;
                        return false;
                    }
                    // prevent the snake to move right when it's body stays to the right of the head
                    if (head.getPosition().x < firstPart.getPosition().x && direction == directions.right) {
                        // no move;
                        return false;
                    }
                }

                if (head.getPosition().x === firstPart.getPosition().x) {
                    // prevent the snake to move up when it's body stays above the head
                    if (head.getPosition().y > firstPart.getPosition().y && direction == directions.top) {
                        // no move;
                        return false;
                    }
                    // prevent the snake to move down when it's body stays below  the head
                    if (head.getPosition().y < firstPart.getPosition().y && direction == directions.bottom) {
                        // no move;
                        return false;
                    }
                }

                return {
                    x: this.snakeBody[0].position.x + direction.dx * CELL_SIZE,
                    y: this.snakeBody[0].position.y + direction.dy * CELL_SIZE
                };
            };

            Snake.prototype.moveTo = function(newPosition) {
                // move all the elements from the last to the second at the position of the cell before them
                // i.e last-> set position of the 'before last', ..., third -> position of the 2nd, 2nd-> of the 1st
                for (var i = this.size - 1; i > 0; i--) {
                    this.snakeBody[i].position = this.snakeBody[i - 1].position;
                };

                // the first element of the snake, i.e its head, will move according to the direction
                this.snakeBody[0].position = {
                    x: newPosition.x,
                    y: newPosition.y
                };
            };

            // Snake.prototype.move = function(direction) {
            //     var head = this.snakeBody[0],
            //         firstPart = this.snakeBody[1];
            //     if (head.getPosition().y === firstPart.getPosition().y) {
            //         if (head.getPosition().x > firstPart.getPosition().x && direction == directions.left) {
            //             // no move;
            //             return false;
            //         }
            //         if (head.getPosition().x < firstPart.getPosition().x && direction == directions.right) {
            //             // no move;
            //             return false;
            //         }
            //     }

            //     if (head.getPosition().x === firstPart.getPosition().x) {
            //         if (head.getPosition().y > firstPart.getPosition().y && direction == directions.top) {
            //             // no move;
            //             return false;
            //         }
            //         if (head.getPosition().y < firstPart.getPosition().y && direction == directions.bottom) {
            //             // no move;
            //             return false;
            //         }
            //     }
            //     // move all the elements from the last to the second at the position of the cell before them
            //     // i.e last-> set position of the 'before last', ..., third -> position of the 2nd, 2nd-> of the 1st
            //     for (var i = this.size - 1; i > 0; i--) {
            //         this.snakeBody[i].position = this.snakeBody[i - 1].position;
            //     };

            //     // the first element of the snake, i.e its head, will move according to the direction
            //     this.snakeBody[0].position = {
            //         x: this.snakeBody[0].position.x + direction.dx * CELL_SIZE,
            //         y: this.snakeBody[0].position.y + direction.dy * CELL_SIZE
            //     };

            //     return true;
            // };

            return Snake;
        })();


        function Wall(position, size) {
            GameObject.call(this, position, size);
        }

        Wall.prototype = new GameObject();
        Wall.prototype.constructor = Wall;


        function Food(position, size) {
            GameObject.call(this, position, size);
        }

        Food.prototype = new GameObject();
        Food.prototype.constructor = Food;

        return {
            Snake: Snake,
            SnakePart: SnakePart,
            Wall: Wall,
            Food: Food
        };
    })();

    return gameObject;
});