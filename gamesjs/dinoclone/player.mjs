import { ctx } from "../dinoclone.mjs"
import { floorY } from "./enviroment.mjs"

const losemsg = document.getElementById('lose-message')

let deltaTime = 0
let isKeyPressed = false
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
        player.yVelocity = 0.5
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
                playerCollider.botton  > enemyCollider.top &&
                playerCollider.top < enemyCollider.botton){
    
                losemsg.style.visibility = "visible"
                losemsg.innerHTML = "you lose"
                isGameRunning = false
            } 
        }
    }
}

let player = new Player()

export function updatePlayer(delta, enemies){
    player.print()
    deltaTime = delta
    if(isGameRunning){ 
        player.lose(enemies)
    }
    if(isKeyPressed === true && player.y > 600)
        player.jump(deltaTime)
    else
        isKeyPressed = false
    return player
}

document.addEventListener('keydown', function(event){
    if(event.key === 'ArrowUp' && player.y >= floorY - player.height && isGameRunning){
        isKeyPressed = true;
    }
})

document.addEventListener('keyup', function(event){
    if(event.key === 'ArrowUp'){
        isKeyPressed = false;
    }
})