var canvas = document.getElementById('gameCanvas')
var ctx = canvas.getContext('2d')

let player = {
    x: 40,
    y: 0,
    size: 0,
    color: 'black',
    jumpImpulse: 1,
    width: 35,
    height: 35
}

function printPlayer(color, x, y, width, height){
    ctx.fillStyle = color
    ctx.fillRect(x, y, width, height)
}

export function updatePlayer(deltaTime, floorY){
    printPlayer(player.color, player.x, floorY - player.height, player.width, player.height)
}