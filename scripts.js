//get DPI
let dpi = window.devicePixelRatio;
//get canvas
let canvas = document.getElementById('background-canvas');
//get context
let ctx = canvas.getContext('2d');
function fix_dpi() {
    //get CSS height
    //the + prefix casts it to an integer
    //the slice method gets rid of "px"
    let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
    //get CSS width
    let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
    //scale the canvas
    canvas.setAttribute('height', style_height * dpi);
    canvas.setAttribute('width', style_width * dpi);

    for (var i = 0; i < 100; i++){
        var randX = style_width * Math.random();
        var randY = style_height * Math.random();
        ctx.beginPath();
        ctx.arc(randX, randY, 2, 0, 2 * Math.PI, false);
        ctx.fillStyle = "#888";
        ctx.fill();
    }
}

