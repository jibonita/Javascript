define(['gameObject', 'renderer', 'constants'], function(gameObject, renderer, constants) {
    var settings = constants.Settings(),
        directions = settings.directions,
        CELL_SIZE = settings.CELL_SIZE,
        INITIAL_SNAKE_LENGTH = settings.INITIAL_SNAKE_LENGTH,
        WALLS_COUNT = settings.WALLS_COUNT;

    var Engine = (function() {
        function random(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        // add events 
        function addSnakeMovementEvents(gameItems, renderer) {
            var gameItems = this._gameItems,
                renderer = this.renderer,
                snake = this.snake;

            $(document).keydown(function(e) {
                var direction,
                    dirKeyPressed = true,
                    newPosition,
                    actions = {
                        move: false,
                        eat: false
                    };

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
            var walls = [],
                position,
                generatedWall;

            for (var i = 0; i < WALLS_COUNT; i++) {
                position = getRandomPosition();
                generatedWall = new gameObject.Wall(position, CELL_SIZE);

                //TODO: Check for repeated coordinates

                walls.push(generatedWall);
            };

            return walls;
        }

        function generateFood() {
            var food = [],
                position = getRandomPosition();
            food.push(new gameObject.Food(position, CELL_SIZE));

            return food;
        }

        function getRandomPosition() {
            var position = {
                x: random(0, 36) * CELL_SIZE,
                y: random(0, 24) * CELL_SIZE
            };
            // TODO: Use the this._positionsMap to check if generated position is free

            return position;
        }

        var Game = (function() {
            function Game(renderer) {
                var walls = generateWalls(),
                    food = generateFood();

                this.self = this;
                this.renderer = renderer;
                this.snake = new gameObject.Snake({
                    x: INITIAL_SNAKE_LENGTH * CELL_SIZE,
                    y: random(6, 24) * CELL_SIZE
                }, INITIAL_SNAKE_LENGTH, CELL_SIZE);

                this._gameItems = [this.snake];

                for (var i = 0; i < walls.length; i++) {
                    this._gameItems.push(walls[i]);
                }
                for (var i = 0; i < food.length; i++) {
                    this._gameItems.push(food[i]);
                }

                this._positionsMap = [];

            }
            Game.prototype = {
                run: function() {
                    for (var i = 0; i < this._gameItems.length; i++) {
                        this.renderer.draw(this._gameItems[i]);
                    }

                    addSnakeMovementEvents.call(this);

                }
            };

            return Game;
        })();

        return {
            Game: Game
        };
    })();

    return Engine;
});