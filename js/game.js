const config = {
    type: Phaser.AUTO,
    width: 320,
    height: 500,
    parent: 'game',
    physics: {
        default: 'arcade'        
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}

const game = new Phaser.Game(config)
let running = false
let counter = 3
let score = 0
let paddleSpeed = 200
let ballSpeed = 150
let floor

function preload() {
    this.load.image('ballGrey', './assets/ballGrey.png')
    this.load.image('paddleBlue', './assets/paddleBlu.png')    
    this.load.image('squareBlue', './assets/element_blue_square.png')
}

function create() {    
    let startDirection = Phaser.Math.RND.between(0, 1)
    block = Array(50)
    blocks = this.physics.add.group({
        immovable: true,
        allowGravity: false
    })
    let xPos = 0
    let yPos = 0
    for(let i = 0; i < block.length; i++) { 
        block[i] = this.add.sprite(xPos, yPos, 'squareBlue').setOrigin(0, 0)
        blocks.add(block[i])
        xPos += 32
        if((i + 1) % 10 === 0) {
            yPos += 32
            xPos = 0
        }
    }
    ball = this.physics.add.sprite((game.config.width - 22) / 2, 160, 'ballGrey').setOrigin(0, 0)
    ball.body.setCollideWorldBounds(true)
    ball.body.setAllowGravity(false)    
    player = this.physics.add.sprite(108, 476, 'paddleBlue').setOrigin(0, 0)
    player.body.setAllowGravity(false)
    player.setCollideWorldBounds(true)
    cursors = this.input.keyboard.createCursorKeys()
    this.physics.add.overlap(player, ball, onCollidePaddle)
    this.physics.add.collider(ball, blocks, onCollideBlocks)
    if(startDirection == 0) {
        ball.moveRight = true
    }
    else {
        ball.moveRight = false
    }
    ball.moveDown = true
    this.timedEvent = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this, loop: true })
}

function update() {
    if(running) {
        if(ball.moveRight) {
            if(ball.x < (game.config.width - ball.width)) {
                ball.setVelocityX(ballSpeed)
            }
            else {
                ball.moveRight = false
            }
        }
        else {
            if(ball.x > 0) {
                ball.setVelocityX(-ballSpeed)
            }
            else {
                ball.moveRight = true
            }
        }
        if(ball.moveDown) {
            if((ball.y + (ball.width + 1)) < game.config.height) {
                ball.setVelocityY(ballSpeed)
            }
            else {
                updateStatus("gameover")
            }            
        }
        else {
            if(ball.y > 0) {
                ball.setVelocityY(-ballSpeed)
            }
            else {
                ball.moveDown = true
            }
        }
        if(cursors.left.isDown) {
            player.setVelocityX(-paddleSpeed)            
        }
        else if(cursors.right.isDown) {
            player.setVelocityX(paddleSpeed)
        }
        else {
            player.setVelocityX(0)
        }
    }    
}

function onCollidePaddle(player, ball) {
    const velocity = player.body.velocity.x
    if(ball.moveDown) {
        ball.moveDown = false
    }
    if(velocity === 200) {
        ball.moveRight = true
    }
    else if(velocity === -200) {
        ball.moveRight = false
    }
}

function onCollideBlocks(ball, block) {
    if(!ball.moveDown) {
        ball.moveDown = true        
    }
    else {
        ball.moveDown = false               
    }
    block.destroy()
    ballSpeed += 2
    score += 100
    const quantity = blocks.countActive(true)
    document.querySelector("#score").innerHTML = score
    document.querySelector("#speed").innerHTML = ballSpeed
    document.querySelector("#blocks").innerHTML = quantity
    if(quantity === 0) {
        updateStatus("win")
    }                
}

async function updateStatus(message) {
    ball.destroy()    
    running = false
    player.body.moves = false
    const status = document.querySelector('#status')
    if(message === "win") {
        status.style.color = "#0f0"
        status.innerHTML = "YOU WIN!"
    }
    else {        
        status.style.color = "#f00"
        status.innerHTML = "GAME OVER"
    }
    
    const formData = new FormData()
    formData.append("query", "save")
    formData.append("game_id", 1)
    formData.append("score", score)    
    
    try {
        await fetch('../controllers/RecordController.php', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json, text/plain, */*'                
            }
        })
        .then((res) => res.json())
        .then((data) => {
            if(data !== null) {
                document.querySelector("#hud").style.fontSize = "26px"
                status.style.color = "#00f"
                status.innerHTML = "NEW RECORD"
            }
        })
    } 
    catch(error) {
        console.log(error)
    }
}

function onEvent() {
    counter--
    const status = document.querySelector('#status')    
    status.innerHTML = counter
    if(counter === 0) {
        status.innerHTML = "GO!"
        running = true
        this.timedEvent.remove(false)
    }    
}