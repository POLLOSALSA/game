const canvas = document.querySelector('canvas')
const c = canvas.getContext("2d")

const gravity = 0.7

canvas.width = 1024;
canvas.height = 570;

c.fillRect(0, 0, canvas.width, canvas.height)

class Sprite {
    constructor({position,velocitty, color = "red" , offset}){
        this.position  = position
        this.velocitty = velocitty
        this.width = 50
        this.height = 150

        this.lastKey 
        this.attackBox = {

            position:{
                x:this.position.x,
                y:this.position.y
            },
            width:100,
            height:50,
            offset
             }
        this.color = color
        this.isAtackig
        this.health = 100
    }
    draw(){
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y,this.width,this.height)

        //atack box
        if(this.isAtackig){
        c.fillStyle = "blue"
        c.fillRect(this.attackBox.position.x ,
                 this.attackBox.position.y ,
                  this.attackBox.width ,
                   this.attackBox.height
                   )
                }

    }
    update(){
        this.draw()
        this.attackBox.position.x = this.position.x - this.attackBox.offset.x
        this.attackBox.position.y = this.position.y

        this.position.x = this.position.x + this.velocitty.x
        this.position.y = this.position.y + this.velocitty.y

        if(this.position.y + this.height + this.velocitty.y  >= canvas.height){
            this.velocitty.y = 0
        }else this.velocitty.y += gravity

        
    }
    atack(){
        this.isAtackig = true
        setTimeout(() => {
            this.isAtackig = false 
        },100)
    }
}

const player = new Sprite({
    position:{
    x: 0,
    y:0
    },
    velocitty:{
    x: 0,
    y:0
    },
    offset:{
        x:0,
        y:0
    },
    color: "orange"
})


const enemy = new Sprite({
    position:{
    x: 400,
    y: 100
    },
    velocitty:{
        x: 0,
        y:0
        },    
        offset:{
            x:50,
            y:0
        },
        color: "green"
})

const keys = {
    a:{
        pressed: false
    },
    d:{
        pressed: false
    },
    w:{
        pressed: false
    },
    ArrowRight:{
        pressed: false
    },
    ArrowLeft:{
        pressed: false
    }
}

function rectangularCollition({rectangle , rectangle2}){
    return(
        rectangle.attackBox.position.x + rectangle.attackBox.width >= rectangle2.position.x 
        && rectangle.attackBox.position.x <= rectangle2.position.x + rectangle2.width
        && rectangle.attackBox.position.y + rectangle.attackBox.height >= rectangle2.position.y
        && rectangle.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )

}


console.log(player);

function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = "black"
    c.fillRect(0,0,canvas.width,canvas.height)
    player.update()
    enemy.update()

    player.velocitty.x = 0
    enemy.velocitty.x = 0
//player movement
    if(keys.a.pressed && player.lastKey === "a"){
        player.velocitty.x = -5
    }else if(keys.d.pressed && player.lastKey === "d"){
        player.velocitty.x = 5
    }

    //enemy movement
    if(keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft"){
        enemy.velocitty.x = -5
    }else if(keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight"){
        enemy.velocitty.x = 5
    }


    // colition

    if(rectangularCollition({
        rectangle: player,
        rectangle2: enemy
    }) &&
        player.isAtackig
        )  {
        player.isAtackig = false
        enemy.health -= 5
            document.querySelector('#enemyhealth').style.width = enemy.health + "%"
        }


    if(rectangularCollition({
        rectangle: enemy,
        rectangle2: player
    }) &&
        enemy.isAtackig
        )
        {
        enemy.isAtackig = false
        player.health -= 5
        document.querySelector('#playerhealth').style.width = player.health + "%"
    }
}



animate()

window.addEventListener("keydown",(event) => {
    console.log(event.key);
    switch(event.key){
        case "d":
            keys.d.pressed = true
            player.lastKey = "d"
        break
        case "a":
         keys.a.pressed = true
         player.lastKey = "a"
        break
        case "w":
        player.velocitty.y = -17
       break
       case " ":
        player.atack()
        break


        console.log(event.key)

       case "ArrowRight":
        keys.ArrowRight.pressed = true
        enemy.lastKey = "ArrowRight"
       break
       case "ArrowLeft":
        keys.ArrowLeft.pressed = true
        enemy.lastKey = "ArrowLeft"
        break
        case "ArrowUp":
        enemy.velocitty.y = -17
        break
        case "ArrowDown":
            enemy.isAtackig = true
            break
    }

})

window.addEventListener("keyup",(event) => {
    switch(event.key){
        case "d":
            keys.d.pressed = false
        break
        case "a":
            keys.a.pressed = false
        break
    }

    //enemy keys
    switch(event.key){
        case "ArrowRight":
            keys.ArrowRight.pressed = false
        break
        case "ArrowLeft":
            keys.ArrowLeft.pressed = false
        break
    }
    console.log(event.key);
})