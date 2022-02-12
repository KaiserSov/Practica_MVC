(function (){
    self.Board = function(width,height){
        this.width = width;
        this.height = height;
        this.playing = false;
        this.game_over = false;
        this.bars = [];
        this.ball = null;
    }

    //Devuelve barras y la pelota
    self.Board.prototype = {
        get elements (){
            var elements = this.bars;
            //elements.push(this.ball);
            return elements;
        }
    }
})();

(function(){
    self.Bar = function(x,y,width,height,board){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.board = board;
        this.board.bars.push(this);
        this.kind = "rectangle";
        this.speed = 10;
    }

    self.Bar.prototype = {
        down: function(){
            this.y += this.speed;
        },
        up: function(){
            this.y -= this.speed;
        },
        toString: function(){
            return"x: "+ this.x + " y: "+ this.y;
        }
    }
})();

(function (){
    self.BoardView = function(canvas,board){
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        this.contexto = canvas.getContext("2d");
    }

    self.BoardView.prototype = {
        clean: function(){
            this.contexto.clearRect(0,0,this.board.width,this.board.height);
        },
        draw: function(){
            for (var i = this.board.elements.length -1; i>=0;i--){
               var el = this.board.elements[i];
               draw(this.contexto,el);
            }
        }
    }

    function draw (contexto,element){

            switch(element.kind){
               case "rectangle":
                    contexto.fillRect(element.x,element.y,element.width,element.height);
                    break; 
            }
    }
})();

var board = new Board(800,400);
var bar = new Bar(20,100,40,100,board);
var bar_2 = new Bar(735,100,40,100,board);
var canvas = document.getElementById('canvas');
var board_view = new BoardView(canvas,board);



document.addEventListener("keydown",function(ev){
    console.log(ev.keyCode);
    ev.preventDefault();

    //Control flechita de arriba
    if(ev.keyCode == 38){
        bar.up();
    }
    //Control flechita de abajo
    else if(ev.keyCode == 40){
        bar.down();
    }
    //Control con W
    if(ev.keyCode == 87){
        bar_2.up();
    }
    //Control con: S
    else if(ev.keyCode == 83){
        bar_2.down();
    }
    console.log("bar 2: "+bar_2);//Mover barritas
    console.log("Bar 1 "+bar);
});

window.requestAnimationFrame(controller);

function controller(){
    board_view.clean();
    board_view.draw();
    window.requestAnimationFrame(controller);//se actueliza el estado de las barras
}