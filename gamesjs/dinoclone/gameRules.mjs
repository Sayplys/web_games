export let points = 0
let counter =  document.getElementById("pointconter")
const losemsg = document.getElementById('lose-message')

export function countPoint(player, enemies){
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

export function gravity(object, deltaTime, floorY){
    let floorLimit = floorY - object.height
    if(object.y < floorLimit){
        object.yVelocity -=  deltaTime * 0.003
    }
    else{
        object.yVelocity = 0
    }
    object.y -= deltaTime * object.yVelocity
    if(object.y > floorLimit){
        object.y = floorLimit
    }
}