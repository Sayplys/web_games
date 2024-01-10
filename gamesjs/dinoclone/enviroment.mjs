let canvas = document.getElementById('gameCanvas')
import { ctx } from "../dinoclone.mjs"

const floorHeight = 50
export const floorY = canvas.width - floorHeight

function printFloor(){
    ctx.fillStyle = 'green'
    ctx.fillRect(0, floorY, canvas.width, floorHeight)
}

export function updateEnviroment(){
    printFloor()
}