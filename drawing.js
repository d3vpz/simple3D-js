////////////////////////////////////////////////////
// ADD A SCRIPT LEADING TO THIS IN YOUR HTML FILE //
// EX. <script src=engine/drawing.js></script>    //
////////////////////////////////////////////////////

var canvas = document.getElementById("window");
var ctx = canvas.getContext("2d");

var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

var focal_length = 100;

function clearScreen() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

function strokeColor(color) {
    ctx.strokeStyle = color;
}

function fillColor(color) {
    ctx.fillStyle = color;
}

function line(x, y, x1, y1) {
    ctx.moveTo(x, y);
    ctx.lineTo(x1, y1);
}

function line3d(x, y, z, x1, y1, z1) {
    var originX = canvasWidth/2;
    var originY = canvasHeight/2;
    ctx.beginPath();
    ctx.moveTo((x/z*focal_length)+originX, (y/z*focal_length)+originY);
    ctx.lineTo((x1/z1*focal_length)+originX, (y1/z1*focal_length)+originY);
    ctx.stroke();
    ctx.beginPath();
}

function plane(x, y, z, width, height) {
    var left_coord = x-(width/2);
    var right_coord = x+(width/2);
    var top_coord = y-(height/2);
    var bottom_coord = y+(height/2);
    line3d(left_coord, top_coord, z, right_coord, top_coord, z);
    line3d(right_coord, top_coord, z, right_coord, bottom_coord, z);
    line3d(right_coord, bottom_coord, z, left_coord, bottom_coord, z);
    line3d(left_coord, bottom_coord, z, left_coord, top_coord, z);
}

function rect_prism(x, y, z, width, height, depth) {
    var left_coord = x-(width/2);
    var right_coord = x+(width/2);
    var top_coord = y-(height/2);
    var bottom_coord = y+(height/2);
    var front_coord = z-(depth/2);
    var back_coord = z+(depth/2);
    plane(x, y, front_coord, width, height);
    plane(x, y, back_coord, width, height);
    line3d(left_coord, top_coord, front_coord, left_coord, top_coord, back_coord);
    line3d(right_coord, top_coord, front_coord, right_coord, top_coord, back_coord);
    line3d(right_coord, bottom_coord, front_coord, right_coord, bottom_coord, back_coord);
    line3d(left_coord, bottom_coord, front_coord, left_coord, bottom_coord, back_coord);
}