var canvas = document.getElementById('gameCanvas')
var ctx = canvas.getContext('2d')

const enemy = {
    x: 0,
    y: 0,
    color: "red",
    width: 20, 
    height: 40
}

const spawn = {
    maxSpawnTime: 3000,
    minSpawnTime: 1000
}

let randomInterval = Math.random() * (spawn.maxSpawnTime - spawn.minSpawnTime) + spawn.minSpawnTime;
let enemies = [];

function spawnEnemy(color, x, y, width, height){
    let enemy = {color: color, width: width, height: height, x: x, y: y}
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
    if(enemies[0].x < 0){
        enemies.shift()
    }
}

export function spawnEnemyAtRandomIntervals(floorY) {
    spawnEnemy("red", canvas.width - enemy.width, floorY - enemy.height, enemy.width, enemy.height);
    setTimeout(()=> {spawnEnemyAtRandomIntervals(floorY)}, randomInterval);
    return enemies
}

export function updateEnemy(deltaTime){
    printEnemies(deltaTime)
    removeEnemy()
}


