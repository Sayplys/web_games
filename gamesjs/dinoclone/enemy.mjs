var canvas = document.getElementById('gameCanvas')
import { ctx } from "../dinoclone.mjs"
import { floorY } from "./enviroment.mjs";
import { isGameRunning, points } from "./player.mjs";

export let enemies = []

function Enemy(x, y, color, width, height, velocity) {
    this.x = x - width
    this.y = y - height
    this.color = color
    this.width = width
    this.height = height
    this.velocity = velocity
    this.hasPassed = false

    this.collider = () => {
        let left = this.x 
        let right = +this.x + +width 
        let top = this.y
        let botton = +this.y + +height
        return {left, right, top, botton}
    }

    this.move = (deltaTime) => {
        this.x -= deltaTime * this.velocity + (points ) ;
    }

    this.die = () => {
        if(enemies[0])
        if(enemies[0].x < 0 - enemies[0].width){
            enemies.shift()
        }
    }

    this.print = () => {
        ctx.fillStyle = this.color 
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

function Spawn(x, y, minTime, maxTime, enemy) {
    this.x = x
    this.y = y
    this.maxTime = minTime
    this.minTime = maxTime
    this.enemy = enemy
    
    this.spawn = () => {
        let enemy = new Enemy(x, y, this.enemy.color, this.enemy.width, this.enemy.height, this.enemy.velocity)
        enemies.push(enemy);
        let randomInterval = Math.random() * (this.maxTime - this.minTime) + this.minTime
        if(isGameRunning){
            setTimeout(()=> {this.spawn(this.x, this.y)}, randomInterval);
        }
    }
}

let enemy = new Enemy(0, 0, "red", 20, 40, 0.2)
let spawn = new Spawn(canvas.width, floorY, 1000, 3000, enemy)


spawn.spawn(canvas.width, floorY);

export function updateEnemy(deltaTime){
    for(let i = 0; i < enemies.length; i++){
        enemies[i].print(deltaTime)
        enemies[i].move(deltaTime)
    }
    if(isGameRunning && enemies[0])
        enemies[0].die()
}


