import { ctx } from "../dinoclone.mjs"
import { floorY } from "./enviroment.mjs"

let counter =  document.getElementById("pointconter")
let deltaTime = 0

let player = {
    x: 80,
    y: 900,
    size: 0,
    color: 'black',
    yVelocity: 0,
    width: 35,
    height: 35,
    points: 0
}

let floorLimit = floorY - player.height
export let nextEnemy = 0;

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

export function countPoint(){  
    player.points++
    counter.innerHTML = "points: " + player.points
}

export function updatePlayer(delta, ){
    deltaTime = delta
    printPlayer(player.color, player.x, player.y, player.width, player.height)
    gravity()
    return player
}

document.addEventListener('keydown', function(event){
    if(event.key === 'ArrowUp' && player.y >= floorLimit){
        jump(deltaTime)
    }
})