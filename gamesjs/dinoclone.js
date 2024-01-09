var canvas = document.getElementById('gameCanvas')
var ctx = canvas.getContext('2d')

const canvasSize = 900
const floorHeight = 50
const floorY = canvasSize - floorHeight

const playerSize = 35
let playerY = floorY - playerSize
let lastTime = 0

const enemySize = {width: 20, height: 40}
const maxSpawnTime = 3000
const minSpawnTime = 1000
let randomInterval;
let enemies = [];

function printFloor(){
    ctx.fillStyle = 'green'
    ctx.fillRect(0, floorY, canvasSize, floorHeight)
}

function printPlayer(color, x, y, width, height){
    ctx.fillStyle = color
    ctx.fillRect(x, y, width, height)
}

function spawnEnemy(color, x, y, width, height){
    let enemy = {color: color, width: width, height: height, x: x, y: y}
    ctx.fillStyle = color
    ctx.fillRect(x, y, width, height)
    enemies.push(enemy);
    randomInterval = Math.random() * (maxSpawnTime - minSpawnTime) + minSpawnTime
}

function printEnemies(deltaTime){
    for(i = 0; i < enemies.length; i++){
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

printPlayer('black', 50, playerY, playerSize, playerSize)

function spawnEnemyAtRandomIntervals() {
    spawnEnemy("red", canvasSize - enemySize.width, floorY - enemySize.height, enemySize.width, enemySize.height);
    setTimeout(spawnEnemyAtRandomIntervals, randomInterval);
}
randomInterval = Math.random() * (maxSpawnTime - minSpawnTime) + minSpawnTime;
spawnEnemyAtRandomIntervals();

function update(timeStamp){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    printFloor()
    
    let delta = timeStamp - lastTime
    printPlayer('black', 50, playerY, playerSize, playerSize)
    printEnemies(delta)
    removeEnemy()

    lastTime = timeStamp
    requestAnimationFrame(update)
}

requestAnimationFrame(update)