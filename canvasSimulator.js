// setting up the canvas
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

//get CSS height
//the + prefix casts it to an integer
//the slice method gets rid of "px"
let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
//get CSS width
let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);

//get DPI
let dpi = window.devicePixelRatio;

//scale the canvas
canvas.setAttribute('height', style_height * dpi);
canvas.setAttribute('width', style_width * dpi);

//setting up particle array for storing particle data
particleNum = 100;
particles = [];

//particle data
maxSpeed = 0.15;

class Particle {
    xpos = style_width * Math.random();
    ypos = style_height * Math.random();

    //TODO: Allow for random speeds
    xvel = this.RandomSpeed();
    yvel = this.RandomSpeed();

    //generates a random number between -maxSpeed and +maxSpeed
    RandomSpeed(){
        //generate magnitude between 0 and maxSpeed
        var magnitude = Math.random() * maxSpeed;

        //decide if we're going to be doing positive or negative
        //math.random generates a number between 0 and 0.99999999
        if (Math.random() < 0.5){
            return -magnitude;
        }
        else {
            return magnitude;
        }
    }
}

function DrawParticle (patricle){
    ctx.beginPath();
    ctx.arc(patricle.xpos, patricle.ypos, 1, 0, 2 * Math.PI, false);
    ctx.fillStyle = "#888";
    ctx.fill();
}

function Draw(){
    ctx.clearRect(0, 0, style_width, style_height);

    //drawing the particles in their current position
    //then moving them
    for (var i = 0; i < particleNum; i++){
        DrawParticle(particles[i]);

        //handling horizontal velocity
        particles[i].xpos += particles[i].xvel;
        if (particles[i].xpos > style_width){
            particles[i].xpos -= style_width;
        }

        particles[i].ypos += particles[i].yvel;
        if (particles[i].ypos > style_height){
            particles[i].ypos -= style_height;
        }
    }

}

window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame    ||
        window.webkitRequestAnimationFrame  ||
        window.mozRequestAnimationFrame     ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
})();

(function init(){
    for(var i = 0; i < particleNum; i++){
        particles.push(new Particle());
    }
})();

(function loop(){
    Draw();
    requestAnimFrame(loop);
})();