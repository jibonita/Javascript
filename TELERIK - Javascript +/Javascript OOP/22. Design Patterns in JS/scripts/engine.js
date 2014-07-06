var engine = (function() {
    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // add events 
    function addSnakeMovementEvents(gameItems, renderer) {
        $(document).keydown(function(e) {
            var direction,
                dirKeyPressed = true,
                newPosition,
                actions = {
                    move: false,
                    eat: false
                },
                snake = gameItems[0];

            switch (e.keyCode) {
                case 37:
                    direction = directions.left;
                    break;
                case 38:
                    direction = directions.top;
                    break;
                case 39:
                    direction = directions.right;
                    break;
                case 40:
                    direction = directions.bottom;
                    break;
                default:
                    dirKeyPressed = false;
            }

            // if the pressed key is not direction arrow, no need to move
            if (dirKeyPressed) {
                newPosition = snake.getMovePosition(direction);
                // if newPosition is false, then no action is necessary, 
                // if it is not false - it will contain new positon 
                if (newPosition) {
                    actions = checkCollisions(gameItems, newPosition, renderer);

                    if (actions.eat) {
                        var lastSnakePartPosition = snake.snakeBody[snake.size - 1].getPosition();
                        var newSnakePartPiece = new gameObject.SnakePart(lastSnakePartPosition, CELL_SIZE);
                    }
                    if (actions.move) {
                        snake.moveTo(newPosition);
                        if (actions.eat) {
                            snake.snakeBody.push(newSnakePartPiece);
                            snake.size++;

                            //generate new food
                            var food = generateFood();
                            for (var i = 0; i < food.length; i++) {
                                gameItems.push(food[i]);
                            }
                        }

                        //if move happened, redraw screen after the movement
                        renderer.clear();
                        for (var i = 0; i < gameItems.length; i++) {
                            renderer.draw(gameItems[i]);
                        }
                    }
                }

            }
        });
    }

    function checkCollisions(objects, position, renderer) {
        var actions = {
            move: true,
            eat: false
        };

        //** check if the snake has reached the end of the canvas
        //TODO: buggy the check if the right border is reached
        if (position.x < 0 || position.x >= renderer.canvas.width ||
            position.y < 0 || position.y >= renderer.canvas.height) {
            return {
                move: false,
                eat: false
            };
        }

        for (var i = 1; i < objects.length; i++) {
            var item = objects[i];
            if (item.getPosition().x === position.x && item.getPosition().y === position.y) {
                if (item instanceof gameObject.Food) {
                    objects.splice(i, 1);
                    actions = {
                        move: true,
                        eat: true
                    };
                }
                if (item instanceof gameObject.Wall) {
                    actions = {
                        move: false,
                        eat: false
                    };
                }

                //TODO: check for collision with a snake part i.e i the snake eats itself

                return actions;
            }

        }
        return actions;
    }

    function generateWalls() {
        //TODO: replace with random

        var wallsCount = 10;
        var walls = [new gameObject.Wall({
                x: 24,
                y: 48
            }, CELL_SIZE),
            new gameObject.Wall({
                x: 240,
                y: 480
            }, CELL_SIZE),
            new gameObject.Wall({
                x: 480,
                y: 240
            }, CELL_SIZE)
        ];

        return walls;
    }

    function generateFood() {
        var food = [];
        food.push(new gameObject.Food({
            x: random(0, 37) * CELL_SIZE,
            y: random(0, 24) * CELL_SIZE
        }, CELL_SIZE));

        return food;
    }

    var Game = (function() {
        function Game(renderer) {
            var walls = generateWalls(),
                food = generateFood();

            this.self = this;
            this.renderer = renderer;
            this.snake = new gameObject.Snake({
                x: 120,
                y: 144
            }, INITIAL_SNAKE_LENGTH, CELL_SIZE);

            this.gameItems = [this.snake];

            for (var i = 0; i < walls.length; i++) {
                this.gameItems.push(walls[i]);
            }
            for (var i = 0; i < food.length; i++) {
                this.gameItems.push(food[i]);
            }

        }
        Game.prototype = {
            run: function() {
                for (var i = 0; i < this.gameItems.length; i++) {
                    this.renderer.draw(this.gameItems[i]);
                }

                addSnakeMovementEvents(this.gameItems, this.renderer);

            }
        };

        return Game;
    })();



    return {
        Game: Game
    };
})();