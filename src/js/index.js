/*? no js js needed from me */
const board = document.querySelector(".board")
console.log(board)

function randomPosition(){ 
  return ~~(Math.random() * 30) + 1 
}

let config = {
  speed: 250, //milli second
  level: 0,
  player: {
    x: randomPosition(),
    y: randomPosition(),
  },
  food: {
    x: randomPosition(),
    y: randomPosition(),
  },
  velocity: {
    x: 0,
    y: 0,
  },
  foodEaten: 0,
  showTitle() {
   
  }
}

const games = {
  createFood() {
    board.innerHTML = `<div class="food" style="grid-area: ${config.food.y} / ${config.food.x}"></div>`
  },
  createPlayer() {
    board.innerHTML += `<div class="player" id="player" style="grid-area: ${config.player.y} / ${config.player.x}"></div>`
  },
  movePlayer() {
    config.player.x += config.velocity.x
    config.player.y += config.velocity.y
  },
  resetPlayerPosition() {
    if(config.player.x <= 0 || config.player.x > 30 || config.player.y <= 0 || config.player.y > 30) {
      console.log('aw kalah....')
      config.player.x = 15;
      config.player.y = 15;
    }
  },
  levelUp() {
    const level = config.level += 1;
    console.log(config.level);
    
    // check if the player has reached level 5
    if (level === 1) {
       // get the title element
       const title = document.getElementById("title_1");
      
       // set the text content and visibility of the title element
       title.textContent = `Selamat Anda Naik Level ${level}!`;
       title.style.opacity = "1";
       title.style.visibility = "visible";
       title.style.zIndex = "1";
     
       // hide the title element after 3 seconds
       setTimeout(function() {
         title.style.opacity = "0";
         title.style.visibility = "hidden";
         title.style.zIndex = "-1"; 
       }, 3000);
    } 
  },
  isWin() {
    if(config.player.x === config.food.x && config.player.y === config.food.y){
        config.foodEaten += 1;
        console.log(config.foodEaten)
        if(config.foodEaten === 5) {
            this.levelUp();
            config.foodEaten = 0;
        }
        return true
    }
  },
  randomFoodPosition() {
    config.food.x = randomPosition()
    config.food.y = randomPosition()
  }, 
}

function movement(listen) {
   switch(listen.key) {
    case "w": //ArrowUp
      config.velocity.y = -1;
      config.velocity.x = 0;
    break;
    case "s": //ArrowDown
      config.velocity.y = 1;
      config.velocity.x = 0;
    break;
    case "a": //ArrowLeft
      config.velocity.x = -1;
      config.velocity.y = 0;
    break;
    case "d": //ArrowRight
      config.velocity.x = 1;
      config.velocity.y = 0;
    break;
    default:
      break;
   }
}

function headMovement() {
  const playerEl = document.getElementById("player")
  if(config.velocity.x == 1) {
    playerEl.style.transform = "scaleX(-1)"
  }
  if(config.velocity.y == -1) {
    playerEl.style.transform = "rotate(90deg)"
  }
  if(config.velocity.y == 1) {
    playerEl.style.transform = "rotate(-90deg)"
  }
}

function start() {
  games.createFood()
  games.createPlayer()
  games.movePlayer()
  headMovement()

  games.resetPlayerPosition()
  const win = games.isWin()
  if(win) games.randomFoodPosition()
}

setInterval(start, config.speed)
document.addEventListener("keydown", movement)
