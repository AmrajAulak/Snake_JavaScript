var c = document.getElementById("Canvas");
var ctx = c.getContext("2d");


class Snake {
    constructor(posX, posY) {
      this.headX = posX;
      this.headY = posY;
      this.body = [[posX, posY]];
      this.direction = "";
      this.width = 50;
    
    }
    
    border_colision(){
        if ((this.headY >= (400 - this.width)) || (this.headY <= 0) || (this.headX <= 0) || (this.headX >= (600 - this.width))) {
            return true;
        } 
        return false;
    }

}


class Food {
    constructor() {
      this.posX = Math.floor(Math.random() * 600) + 1;
      this.posY = Math.floor(Math.random() * 400) + 1;
      this.height = 50;
    }

    // create_food(){
    //     ctx.fillStyle = "#00FFFF";
    //     ctx.fillRect(this.posX, this.posY, this.height, this.height);
    // }
}


function run_Game() {
    const snake = new Snake(100, 100);
    ctx.fillStyle = "#00FF00";
    ctx.fillRect(snake.headX, snake.headY, 50, 50);

    const food = new Food(100, 100);

    var ID;

    document.addEventListener("keydown", function(event) {

    if (event.key == "ArrowLeft"){
        snake.direction = "Left key";
    } else if (event.key == "ArrowUp"){
        snake.direction = "Up key";
    } else if (event.key == "ArrowRight"){
        snake.direction = "Right key";
    } else if (event.key == "ArrowDown"){
        snake.direction = "Down key";
    }

    console.log(snake.direction)
    
    });


    ID = requestAnimationFrame(game_loop);

    function game_loop() {
        
        if (snake.direction  == "Right key"){
            snake.headX++;
        } else if (snake.direction  == "Left key"){
            snake.headX--;
        } else if (snake.direction  == "Up key"){
            snake.headY--;
        } else if (snake.direction  == "Down key"){
            snake.headY++;
        }
    
        ctx.fillStyle = "#00FF00";
        ctx.fillRect(snake.headX, snake.headY, 50, 50)
        
        if (!snake.border_colision()){

            ID = requestAnimationFrame(game_loop);
        
        } else{
            cancelAnimationFrame(ID);
        }
    }
}

run_Game()


    

