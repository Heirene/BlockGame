var blocks = []
var loadLevel = function(n){
    n = n-1
    var level = levels[n]
    var blocks = []
    for(var i = 0; i < level.length; i++){
        var p = level[i]
        var b = Block(p)
        blocks.push(b)
    }
    log(blocks)
    return blocks
}
var enableDebugMode = function(enable){
    if(!enable){
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event){
        var k = event.key
        if(k == 'p'){
            window.paused = !window.paused
        }else if('1234567'.includes(k)){
            blocks = loadLevel(k)
        }
    })
    // 控制球的速度
    document.querySelector('#id-input-speed').addEventListener('input', function(event) {
        var input = event.target
        window.fps = Number(input.value)
    })
}

var __main = function(){
    enableDebugMode(true)
    var score = 0
    var game = gameHandler(30)
    var paddle = Paddle()
    var ball = Ball()
    blocks = loadLevel(1)



    game.registerAction('a', function(){
        paddle.moveLeft()
    })
    game.registerAction('d', function(){
        paddle.moveRight()
    })
    game.registerAction('f', function(){
        ball.fire()
    })

    game.update = function() {
        if (window.paused) {
            return
        }
        ball.move()
        if (paddle.collide(ball)) {
            ball.rebound()
        }
        for(var i = 0; i < blocks.length; i++){
            var block = blocks[i]
            if(block.collide(ball)){
                block.kill()
                score += 100
                ball.rebound()
            }
        }
    }
    game.draw = function() {
        game.drawImage(paddle)
        game.drawImage(ball)
        for(var i = 0; i < blocks.length; i++){
            var block = blocks[i]
            if(block.alive){
                game.drawImage(block)
            }

        }
        game.context.fillText('分数: ' + score, 10, 290)
    }
}
__main()
