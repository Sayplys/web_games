import { floorY, updateEnviroment } from "./dinoclone/enviroment.mjs"
import { updatePlayer} from "./dinoclone/player.mjs"
import { updateEnemy, enemies } from "./dinoclone/enemy.mjs"
import { gravity, countPoint } from "./dinoclone/gameRules.mjs"

var canvas = document.getElementById('gameCanvas')
export var ctx = canvas.getContext('2d')

let lastTime = 0

function update(timeStamp){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    let deltaTime = timeStamp - lastTime

    updateEnviroment()
    let player = updatePlayer(deltaTime, enemies)
    updateEnemy(deltaTime)

    gravity(player, deltaTime, floorY)
    countPoint(player, enemies)

    lastTime = timeStamp
    requestAnimationFrame(update)
}

requestAnimationFrame(update)