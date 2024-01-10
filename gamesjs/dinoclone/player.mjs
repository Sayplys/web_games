import { ctx } from "../dinoclone.mjs"
import { floorY } from "./enviroment.mjs"

let counter =  document.getElementById("pointconter")
const losemsg = document.getElementById('lose-message')
let deltaTime = 0
export let isGameRunning = true

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
        player.yVelocity -=  deltaTime * 0.003
    }
    else{
        player.yVelocity = 0
    }
    player.y -= deltaTime * player.yVelocity
    if(player.y > floorLimit){
        player.y = floorLimit
    }
}

function countPoint(enemies){  
    for(let i = 0; i < enemies.length; i++){
        if(player.x > enemies[i].x && enemies[i].hasPassed === false){
            enemies[i].hasPassed = true;
            player.points++
            counter.innerHTML = "points: " + player.points
        }
    }
}

function lose(enemies){
    let distance = 0
    for(let i = 0; i < enemies.length; i++){
        distance = Math.sqrt(Math.abs(enemies[i].x - player.x) + Math.abs(enemies[i].y - player.y))
        if(distance < 5.7){
            losemsg.style.visibility = "visible"
            losemsg.innerHTML = "you lose"
            isGameRunning = false
        } 
    }
}

export function updatePlayer(delta, enemies){
    printPlayer(player.color, player.x, player.y, player.width, player.height)
    deltaTime = delta
    gravity(enemies)
    if(isGameRunning){ 
        countPoint(enemies)
        lose(enemies)
    }
}

document.addEventListener('keydown', function(event){
    if(event.key === 'ArrowUp' && player.y >= floorLimit && isGameRunning){
        jump(deltaTime)
    }
})