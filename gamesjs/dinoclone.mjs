import { updateEnviroment } from "./dinoclone/enviroment.mjs"
import { updatePlayer, isGameRunning} from "./dinoclone/player.mjs"
import { updateEnemy, spawnEnemyAtRandomIntervals } from "./dinoclone/enemy.mjs"

var canvas = document.getElementById('gameCanvas')
export var ctx = canvas.getContext('2d')

let lastTime = 0


let enemies = []
enemies = spawnEnemyAtRandomIntervals();

function update(timeStamp){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    let delta = timeStamp - lastTime

    updateEnviroment()
    updatePlayer(delta, enemies)
    updateEnemy(delta)

    lastTime = timeStamp
    requestAnimationFrame(update)
}

requestAnimationFrame(update)