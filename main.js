/**
 * Created by hp on 12.09.2016.
 */

function draw(f, df, context, xleft, ytop, width, height, iterations) {
    ctx.clearRect(xleft, ytop, width, height);
    ctx.strokeRect(xleft, ytop, width, height);
}

var canvas = document.getElementById("canvas");
draw(Math.sin, Math.cos, canvas.getContext('2d'), 10, 10, 580, 780, null);