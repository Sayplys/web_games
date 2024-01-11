var canvas = document.getElementById('gameCanvas')
import { ctx } from "../dinoclone.mjs"
import { floorY } from "./enviroment.mjs";
import { isGameRunning } from "./player.mjs";

function Enemy(x, y, color, width, height) {
    this.x = x - width
    this.y = y - height
    this.color = color
    this.width = width
    this.height = height
    this.hasPassed = false
    this.collider = function() {
        let left = this.x 
        let right = +this.x + +height 
        let top = this.y
        let botton = +this.y + +height
        return {left, right, top, botton}
    }
}

const spawn = {
    maxSpawnTime: 3000,
    minSpawnTime: 1000
}

let randomInterval = Math.random() * (spawn.maxSpawnTime - spawn.minSpawnTime) + spawn.minSpawnTime;
let enemies = [];


function spawnEnemy(x, y){
    let enemy = new Enemy(x, y, 'red', '20', '30')
    ctx.fillStyle = enemy.color
    ctx.fillRect(x, y, enemy.width, enemy.height)
    enemies.push(enemy);
    randomInterval = Math.random() * (spawn.maxSpawnTime - spawn.minSpawnTime) + spawn.minSpawnTime
}

function printEnemies(deltaTime){
    for(var i = 0; i < enemies.length; i++){
        ctx.fillStyle = enemies[i].color 
        ctx.fillRect(enemies[i].x, enemies[i].y, enemies[i].width, enemies[i].height)
        enemies[i].x -= deltaTime * 0.18;
    }
}

function removeEnemy(){
    if(enemies[0].x < 0 - enemies[0].width){
        enemies.shift()
    }
}

export function spawnEnemyAtRandomIntervals() {
    spawnEnemy(canvas.width, floorY);
    if(isGameRunning){
        setTimeout(()=> {spawnEnemyAtRandomIntervals(floorY)}, randomInterval);
    }
    return enemies
}

export function updateEnemy(deltaTime){
    printEnemies(deltaTime)
    if(isGameRunning)
        removeEnemy()
}


