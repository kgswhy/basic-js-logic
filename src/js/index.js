const board = document.querySelector('.board');
console.log(board);

let config = {
    speed: 0,
    player:{
        x: 10,
        y: 10,
    },  
    food:{
        x: 15,
        y: 15,
    }
}

const game = {
    
    createFood(){
        board.innerHTML = `<div class="food" style="grid-area: ${config.food.y} / ${config.food.x}"></div>`
    },
    createPlayer(){
        board.innerHTML += `<div class="player" style="grid-area: ${config.player.y} / ${config.player.x}"></div>`
    }
}

game.createFood();
game.createPlayer();