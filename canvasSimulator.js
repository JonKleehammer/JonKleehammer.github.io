// setting up the canvas
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

//get CSS height
//the + prefix casts it to an integer
//the slice method gets rid of "px"
let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
//get CSS width
let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);

//scale the canvas
canvas.setAttribute('height', style_height);
canvas.setAttribute('width', style_width);

//get DPI
//we scale the size of the dots, the speed of the dots, and the number of dots to the DPI
//TODO: Implement the above mentioned scaling
let dpi = window.devicePixelRatio;

//setting up particle array for storing particle data
//TODO: Scale particle number with screen area
particleNum = 100;
particles = [];

//particle data
maxSpeed = 0.2;

//line data
ctx.lineWidth = 1;
maxDistance = 100;

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
    ctx.arc(patricle.xpos, patricle.ypos, 2, 0, 2 * Math.PI, false);
    ctx.fillStyle = "#888";
    ctx.fill();
}

function ConnectParticles (particleA, particleB){
    //using some good ol' pythagorean theorem
    xDistance = particleA.xpos - particleB.xpos;
    yDistance = particleA.ypos - particleB.ypos;

    distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
    //TODO: Account for connecting lines across screen boundaries
    if (distance < maxDistance){
        //distance percent controls the alpha value of the line color
        //the further they are the more faded the line is
        percent = 1 - (distance / maxDistance);
        ctx.strokeStyle = `rgba(88, 88, 88, ${percent})`;

        ctx.beginPath();
        ctx.moveTo(particleA.xpos, particleA.ypos);
        ctx.lineTo(particleB.xpos, particleB.ypos);
        ctx.stroke();
    }
}

function Draw(){
    ctx.clearRect(0, 0, style_width, style_height);


    for (let i = 0; i < particleNum; i++){
        for (let j = 0; j < particleNum; j++){
            //we don't draw a line from a particle to itself
            if (i !== j){
                ConnectParticles(particles[i], particles[j]);
            }
        }
    }

    //drawing particles after the lines so the show up on top
    for (let i = 0; i < particleNum; i++){
        DrawParticle(particles[i]);
    }
}

function MoveParticles(){
    for (var i = 0; i < particleNum; i++){
        //handling horizontal velocity
        particles[i].xpos += particles[i].xvel;

        //the max distance, we allow it to go a little bit past the boundary
        //because if it was transported immediately it might suddenly lose a connector line, which doesn't look good

        //if we go over the max width of the page
        if (particles[i].xpos > style_width + maxDistance) {
            particles[i].xpos -= style_width + maxDistance;
        }
        //if we go under the min width of the page
        else if (particles[i].xpos < -maxDistance) {
            particles[i].xpos += style_width + maxDistance;
        }

        particles[i].ypos += particles[i].yvel;
        if (particles[i].ypos > style_height + maxDistance) {
            particles[i].ypos -= style_height + maxDistance;
        }
        else if (particles[i].ypos < -maxDistance ) {
            particles[i].ypos += style_width + maxDistance;
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
    MoveParticles();
    requestAnimFrame(loop);
})();