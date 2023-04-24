var c = document.getElementById("Canvas");
var ctx = c.getContext("2d");


class Snake {
    constructor(posX, posY) {
      this.headX = posX;
      this.headY = posY;
      this.width = 20;
      this.body = [[posX, posY], [(posX - this.width), posY], [(posX -  2*this.width), posY]];
      this.direction = "";
      
    
    }
    
    border_collision(){
        if ((this.headY >= (400 - this.width)) || (this.headY <= 0) || (this.headX <= 0) || (this.headX >= (600 - this.width))) {
            return true;
        } 
        return false;
    }

    body_collision(){
        for (let i = 1; i < this.body.length; i++) {
           if ((Math.abs(this.body[i][0] - this.headX) <= 5) && (Math.abs(this.body[i][1] - this.headY) <= 5)) {
                console.log("body colision")
                return true;
            }
        }
        return false;
    }

    extend(){
        this.body.push([(this.body.at(-1)[0] - this.width), this.body.at(-1)[1]])
        console.log(this.body.at(0), this.body.at(-1))
    }

    animate(){

        for (let i = this.body.length - 1; i > 0; i--) {
            this.body[i][0] = this.body[i-1][0];
            this.body[i][1] = this.body[i-1][1];
        } 

        if (this.direction  == "Right key"){
            this.headX += this.width;
        } else if (this.direction  == "Left key"){
            this.headX -= this.width;
        } else if (this.direction  == "Up key"){
            this.headY -= this.width;
        } else if (this.direction  == "Down key"){
            this.headY += this.width;;
        }

        this.body[0][0] = this.headX;
        this.body[0][1] = this.headY;

        console.log(this.body.length)

    }

    draw(){
        for (let i = 0; i < this.body.length; i++) {
            ctx.fillStyle = "#00FF00";
            ctx.fillRect(this.body[i][0], this.body[i][1], this.width, this.width);
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#026c45";
            ctx.strokeRect(this.body[i][0], this.body[i][1], this.width, this.width);

        }

    }

}


class Food {
    constructor() {
      this.height = 20;
      this.X = 0;
      this.Y = 0;
      this.reset();
      this.draw();
    }

    reset(){
        this.X = Math.floor((Math.random() * 29)) * this.height;
        this.Y = Math.floor((Math.random() * 19)) * this.height;
        console.log("Amraj")
        console.log("reset", this.X, this.Y);
    }

    draw(){
        ctx.fillStyle = "#00FFFF";
        ctx.fillRect(this.X, this.Y, this.height, this.height);
    }

}

function clear_canvas(){
    ctx.clearRect(0, 0, Canvas.width, Canvas.height);
}

function check_food_eaten(snake, food){
    if ((Math.abs(snake.headX - food.X) <= 5) && (Math.abs(snake.headY - food.Y) <= 5)){
        console.log("extended");
        return true;
    } 

    return false;
}

function is_Game_Over(snake){
    
    if ((snake.border_collision()) || (snake.body_collision())){

        ctx.font = "40px Arial";
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle'
        ctx.fillStyle = "yellow";
        ctx.fillText("Game Over",(Canvas.width / 2), (Canvas.height / 2));

        return true;
    }
    return false;
}

function run_Game() {
    const snake = new Snake(100, 100);
    snake.draw()
    const food = new Food();

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

    ID = setInterval(game_loop, 400);

    function game_loop() {

        if (snake.direction != ""){
            snake.animate()
        }

        if (check_food_eaten(snake, food)){
            snake.extend()
            food.reset()
        }

        clear_canvas()
        food.draw()
        snake.draw()
        
        if (is_Game_Over(snake)){
            clearInterval(ID);
        }

    }
}

run_Game()


    

