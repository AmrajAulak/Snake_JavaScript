

// var boundary = document.getElementById("border");

// console.log(block.offsetTop)

// var height = block.offsetHeight;
// var topMargin = Math.round(rect.top);
// var leftMargin = Math.round(rect.left);
// var rightMargin = Math.round(rect.right);
// var bottomMargin = Math.round(rect.bottom);


function border_colision(xPos, yPos){
    if ((xPos >= 650) || (xPos <= 100) || (yPos <= 50) || (yPos >= 400)) {
        return true;
    } 
    return false;
}


function run_Game() {
    var direction = "";
    var ID;

    document.addEventListener("keydown", function(event) {
    
        if (event.key == "ArrowLeft"){
           direction = "Left key";
        } else if (event.key == "ArrowUp"){
           direction = "Up key";
        } else if (event.key == "ArrowRight"){
           direction = "Right key";
        } else if (event.key == "ArrowDown"){
           direction = "Down key";
        }
        console.log(direction)
    });
    
    ID = requestAnimationFrame(move_snake);
  

    function move_snake() {
        var snake = document.getElementById("snake");   
        var xPos = snake.offsetLeft;
        var yPos = snake.offsetTop;
         
        if (direction  == "Right key"){
            xPos++;
        } else if (direction  == "Left key"){
            xPos--;
        } else if (direction  == "Up key"){
            yPos--;
        } else if (direction  == "Down key"){
            yPos++;
        }
        
        snake.style.top = yPos + "px";
        snake.style.left = xPos + "px";

        if (!border_colision(xPos, yPos)){
        
            ID = requestAnimationFrame(move_snake);

        } else{
            cancelAnimationFrame(ID);
        }

        // use canvas?
    }

    console.log("hello")

}

run_Game()

