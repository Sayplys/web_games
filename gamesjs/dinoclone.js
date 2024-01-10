import { updatePlayer } from "./dinoclone/player.js"
import { updateEnemy, spawnEnemyAtRandomIntervals } from "./dinoclone/enemy.js"

var canvas = document.getElementById('gameCanvas')
var ctx = canvas.getContext('2d')

const floorHeight = 50
const floorY = canvas.width - floorHeight
let lastTime = 0

function printFloor(){
    ctx.fillStyle = 'green'
    ctx.fillRect(0, floorY, canvas.width, floorHeight)
}

spawnEnemyAtRandomIntervals(floorY);

function update(timeStamp){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    printFloor()
    
    let delta = timeStamp - lastTime

    updatePlayer(delta, floorY)
    updateEnemy(delta)

    lastTime = timeStamp
    requestAnimationFrame(update)
}

requestAnimationFrame(update)