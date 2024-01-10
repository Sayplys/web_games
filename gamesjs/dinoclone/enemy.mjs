var canvas = document.getElementById('gameCanvas')
import { ctx } from "../dinoclone.mjs"
import { floorY } from "./enviroment.mjs";
import { countPoint } from "./player.mjs";

const enemy = {
    x: 0,
    y: 0,
    color: "red",
    width: 20, 
    height: 40,
    hasPassed: false
}

const spawn = {
    maxSpawnTime: 3000,
    minSpawnTime: 1000
}

let randomInterval = Math.random() * (spawn.maxSpawnTime - spawn.minSpawnTime) + spawn.minSpawnTime;
let enemies = [];

function spawnEnemy(color, x, y, width, height, hasPassed){
    let enemy = {color: color, width: width, height: height, x: x, y: y, hasPassed: hasPassed}
    ctx.fillStyle = color
    ctx.fillRect(x, y, width, height)
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
    if(enemies[0].x < 0 - enemy.width){
        enemies.shift()
    }
}

export function spawnEnemyAtRandomIntervals() {
    spawnEnemy(enemy.color, canvas.width - enemy.width, floorY - enemy.height, enemy.width, enemy.height, enemy.hasPassed);
    setTimeout(()=> {spawnEnemyAtRandomIntervals(floorY)}, randomInterval);
    return enemies
}

export function updateEnemy(deltaTime, player){
    printEnemies(deltaTime)
    removeEnemy()
    for(let i = 0; i < enemies.length; i++){
        if(player.x > enemies[i].x && enemies[i].hasPassed === false){
            enemies[i].hasPassed = true;
            countPoint()
        }
    }
}


