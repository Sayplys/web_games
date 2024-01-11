import { ctx } from "../dinoclone.mjs"
import { floorY } from "./enviroment.mjs"

let counter =  document.getElementById("pointconter")
const losemsg = document.getElementById('lose-message')
let deltaTime = 0
export let isGameRunning = true

function Player() {
    this.x = 80
    this.y = 900
    this.size = 0
    this.color = 'black'
    this.yVelocity = 0
    this.width = 35
    this.height = 35
    this.points = 0
    this.collider = function() {
        let left = this.x 
        let right = +this.x + +this.height 
        let top = this.y
        let botton = +this.y + +this.height
        return {left, right, top, botton}
    }
}

let player = new Player()

let floorLimit = floorY - player.height

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
    let playerCollider = player.collider();
    for(let i = 0; i < enemies.length; i++){
        let enemyCollider = enemies[i].collider()
        if(playerCollider.left > enemyCollider.right && enemies[i].hasPassed === false){
            enemies[i].hasPassed = true;
            player.points++
            counter.innerHTML = "points: " + player.points
        }
    }
}

function lose(enemies){
    let playerCollider = player.collider();
    for(let i = 0; i < enemies.length; i++){
        let enemyCollider = enemies[i].collider()
        if(playerCollider.left < enemyCollider.right && 
            playerCollider.right > enemyCollider.left && 
            playerCollider.botton  > enemyCollider.top){

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