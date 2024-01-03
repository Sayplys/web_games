var canvas = document.getElementById('gameCanvas')
var ctx = canvas.getContext('2d')

const canvasSize = 900
const floorHeight = 50
const floorY = canvasSize - floorHeight

const playerSize = 35
let playerY = floorY - playerSize
let lastTime = 0


function createFloor(){
    ctx.fillStyle = 'green'
    ctx.fillRect(0, floorY, canvasSize, floorHeight)
}

function createPlayer(color, x, y, width, height){
    ctx.fillStyle = color
    ctx.fillRect(x, y, width, height)
}

createPlayer('black', 50, playerY, playerSize, playerSize)

function update(timeStamp){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    createFloor()
    
    let delta = timeStamp - lastTime
    createPlayer('black', 50, playerY, playerSize, playerSize)
    playerY -= delta * 0.1
    lastTime = timeStamp
    requestAnimationFrame(update)
}

requestAnimationFrame(update)