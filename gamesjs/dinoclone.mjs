import { updateEnviroment } from "./dinoclone/enviroment.mjs"
import { updatePlayer} from "./dinoclone/player.mjs"
import { updateEnemy, enemies } from "./dinoclone/enemy.mjs"

var canvas = document.getElementById('gameCanvas')
export var ctx = canvas.getContext('2d')

let lastTime = 0

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