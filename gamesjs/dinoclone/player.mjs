var canvas = document.getElementById('gameCanvas')
var ctx = canvas.getContext('2d')

let deltaTime = 0

let player = {
    x: 80,
    y: 820,
    size: 0,
    color: 'black',
    yVelocity: 0,
    width: 35,
    height: 35
}

let floorLimit = 820

function printPlayer(color, x, y, width, height){
    ctx.fillStyle = color
    ctx.fillRect(x, y, width, height)
}

function jump(){
    player.yVelocity = 1
    player.y -= deltaTime * player.yVelocity
}

function gravity(){
    if(player.y < floorLimit){
        player.yVelocity -= deltaTime * 0.003
    }
    else{
        player.yVelocity = 0
    }
    player.y -= deltaTime * player.yVelocity
    if(player.y > floorLimit){
        player.y = floorLimit
    }
}

export function updatePlayer(delta){
    deltaTime = delta
    printPlayer(player.color, player.x, player.y, player.width, player.height)
    gravity()
}

document.addEventListener('keydown', function(event){
    if(event.key === 'ArrowUp' && player.y >= 820){
        jump(deltaTime)
    }
})