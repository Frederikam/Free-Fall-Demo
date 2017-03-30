var canvas;
var ctx;
var balls = [];
var g = 9.82 * 5;

function loop() {
    //ctx.clearRect(0, 0, canvas.width, canvas.height);

    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    canvas.setAttribute("width", w);
    canvas.setAttribute("height", h);

    render();

    // execute loop function over and over
    requestAnimationFrame(loop);
}

function onReady() {
    canvas = document.querySelector("canvas");
    ctx = canvas.getContext("2d");
    document.addEventListener('click', onClick, false);
    requestAnimationFrame(loop);
}

document.addEventListener("DOMContentLoaded", onReady);

function render() {
    for(var i in balls) {
        var ball = balls[i];

        var t = ((new Date().getTime() - ball.time) / 1000);
        ball.calcY = 0.5 * g * Math.pow(t, 2) + ball.y;

        ctx.beginPath();
        ctx.fillStyle = "#888888";
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000000";
        ctx.arc(ball.x, ball.calcY,50,0,2*Math.PI);
        ctx.fill();
        ctx.stroke();

        drawVelocity(ball);
    }
}

function drawVelocity(ball) {
    var t = ((new Date().getTime() - ball.time) / 1000);
    var v = g * t;

    ctx.beginPath();
    ctx.strokeStyle = "#FF0000";
    ctx.lineWidth = 5;
    ctx.moveTo(ball.x, ball.calcY);
    ctx.lineTo(ball.x, ball.calcY + v);
    ctx.stroke();
}

function onClick(event) {
    balls.push({
        x: event.pageX,
        y: event.pageY,
        time: new Date().getTime()
    });

    if(document.getElementById("clickme") != null) {
        document.getElementById("clickme").outerHTML = "";
    }
}