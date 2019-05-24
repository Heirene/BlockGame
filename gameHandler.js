var gameHandler = function(fps){
    var g = {
        actions:[],
        keydowns:[],
    }
    var canvas = document.querySelector('#id-canvas')
    var context = canvas.getContext('2d')
    g.canvas = canvas
    g.context = context
    g.drawImage = function(img){
        //log('img test:',img)
        g.context.drawImage(img.image, img.x, img.y)
    }
    window.addEventListener('keydown', function(event){
        g.keydowns[event.key] = true
    })
    window.addEventListener('keyup', function(event){
        g.keydowns[event.key] = false
    })
    g.registerAction = function(key, callback){
        g.actions[key] = callback
    }
    window.fps = 30
    var runLoop = function(){
        var actions = Object.keys(g.actions)
        for(var i =0; i < actions.length; i++){
            var key = actions[i]
            if(g.keydowns[key]){
                g.actions[key]()
            }
        }
        g.update()
        context.clearRect(0, 0, canvas.width, canvas.height)
        g.draw()
        setTimeout(function(){
            runLoop()
        }, 1000/window.fps)
    }
    /*setInterval(function(){
        // events
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if(g.keydowns[key]) {
                // 如果按键被按下, 调用注册的 action
                g.actions[key]()
            }
        }
        // update
        g.update()
        // clear
        context.clearRect(0, 0, canvas.width, canvas.height)
        // draw
        g.draw()
    }, 1000/60)*/
    setTimeout(function(){
        runLoop()
    }, 1000/fps)
    return g

}
