import { ctx } from "../dinoclone.mjs"
import { floorY } from "./enviroment.mjs"

export let points = 0;
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


    this.collider = function() {
        let left = this.x 
        let right = +this.x + +this.height 
        let top = this.y
        let botton = +this.y + +this.height
        return {left, right, top, botton}
    }

    this.jump = () => {
        player.yVelocity = 1
        player.y -= deltaTime * player.yVelocity
    }

    this.print = () => {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    this.lose = (enemies)=>{
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

    this.countPoint = (enemies) => {
        let playerCollider = player.collider();
        for(let i = 0; i < enemies.length; i++){
            let enemyCollider = enemies[i].collider()
            if(playerCollider.left > enemyCollider.right && enemies[i].hasPassed === false){
                enemies[i].hasPassed = true;
                points++
                counter.innerHTML = "points: " + points
            }
        }
    }
}

let player = new Player()
let floorLimit = floorY - player.height

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

export function updatePlayer(delta, enemies){
    player.print()
    deltaTime = delta
    gravity(enemies)
    if(isGameRunning){ 
        player.countPoint(enemies)
        player.lose(enemies)
    }
}

document.addEventListener('keydown', function(event){
    if(event.key === 'ArrowUp' && player.y >= floorLimit && isGameRunning){
        player.jump(deltaTime)
    }
})