/**
 * Created by hp on 12.09.2016.
 */

function draw(f, df, context, a, b, xleft, ytop, width, height, iterations) {
    var n = 1000;
    var step = (b - a) / n;
    var eps = 0.00001;
    var ymin = f(a);
    var ymax = f(a);
    for(var i = 1; i <= n; ++i) {
        if(ymin - f(a + i * step) >= -eps) ymin = f(a + i * step);
        if(f(a + i * step) - ymax >= -eps) ymax = f(a + i * step);
    }
    var xcoef = width / (b - a);
    var ycoef = xcoef;
    var xshift = width * a / (a - b);
    var yshift = height * ymax / (ymax - ymin);
    var step1 = (b - a) / 20;
    var step2 = (ymax - ymin) / 20;
    if(Math.abs(ymax - ymin) >= eps) ycoef = height / (ymin - ymax);
    context.translate(xleft, ytop);
    context.clearRect(0, 0, width, height);
    context.strokeStyle = "black";
    context.strokeRect(0, 0, width, height);
    context.beginPath();
    context.moveTo(xcoef * a + xshift, ycoef * f(a) + yshift);
    for(i = 1; i <= n; ++i) {
        context.lineTo(xcoef * (a + i * step) + xshift, ycoef * f(a + i * step) + yshift);
        context.moveTo(xcoef * (a + i * step) + xshift, ycoef * f(a + i * step) + yshift);
    }
    context.strokeStyle = "blue";
    context.stroke();
    context.beginPath();
    if((a <= eps) && (b >= -eps)) {
        context.moveTo(xshift, 0);
        context.lineTo(xshift, height);
    }
    if((ymin <= eps) && (ymax >= -eps)) {
        context.moveTo(0, yshift);
        context.lineTo(width, yshift);
    }
    context.strokeStyle = "black";
    context.stroke();
    if(iterations != null) {
        context.beginPath();
        iterations.forEach(function (iteration) {
            context.moveTo(xcoef * a + xshift, ycoef * (f(iteration) + df(iteration) * (a - iteration)) + yshift);
            context.lineTo(xcoef * b + xshift, ycoef * (f(iteration) + df(iteration) * (b - iteration)) + yshift);
        });
        context.strokeStyle = "red";
        context.stroke();
    }
    var eps1 = 0.5;
    context.beginPath();
    if(((step1 * 1000 - Math.floor(step1 * 1000)) <= eps1) || (Math.floor(step1 * 1000 + 1) - step1 * 1000) <= eps1) {
        if((step1 * 1000 - Math.floor(step1 * 1000)) <= eps1) step1 = (Math.floor(step1 * 1000)) / 1000.0;
        else step1 = (Math.floor(step1 * 1000 + 1)) / 1000.0;
        var begin = (1000 * a - Math.floor(1000 * a) >= eps) ? (Math.floor(1000 * a + 1)) / 1000.0 : a;
        while(b - begin >= eps) {
            context.moveTo(xcoef * begin + xshift, yshift + 5);
            context.lineTo(xcoef * begin + xshift, yshift - 5);
            context.fillText(begin.toString(), xcoef * begin + xshift, yshift + 10);
            begin += step1;
        }
    }
    if(((step2 * 1000 - Math.floor(step2 * 1000)) <= eps1) || (Math.floor(step2 * 1000 + 1) - step2 * 1000) <= eps1) {
        if((step2 * 1000 - Math.floor(step2 * 1000)) <= eps1) step2 = (Math.floor(step2 * 1000)) / 1000.0;
        else step2 = (Math.floor(step2 * 1000 + 1)) / 1000.0;
        begin = (1000 * ymin - Math.floor(1000 * ymin) >= eps) ? (Math.floor(1000 * ymin + 1)) / 1000.0 : ymin;
        while(ymax - begin >= eps) {
            context.moveTo(xshift + 5, ycoef * begin + yshift);
            context.lineTo(xshift - 5, ycoef * begin + yshift);
            context.fillText(begin.toString(), xshift + 10, ycoef * begin + yshift);
            begin += step2;
        }
    }
    context.strokeStyle = "black";
    context.stroke();
    context.translate(-xleft, -ytop);
}

function onClick() {
    var canvas = document.getElementById("canvas");
    var fielda = document.getElementById("fielda");
    var fieldb = document.getElementById("fieldb");
    var fieldx = document.getElementById("fieldx0");
    var fieldeps = document.getElementById("fieldeps");
    var a = parseFloat(fielda.value);
    var b = parseFloat(fieldb.value);
    var x0 = parseFloat(fieldx.value);
    var eps = parseFloat(fieldeps.value);
    if(isNaN(x0)) {
        draw(f, df, canvas.getContext('2d'), a, b, xleft, ytop, (width - 2 * xleft), (height - 2 * ytop), null);
    }
    else {
        var root = solve(f, df, x0, eps);
        alert('The root is ' + root[root.length - 1].toString());
        draw(f, df, canvas.getContext('2d'), a, b, xleft, ytop, (width - 2 * xleft), (height - 2 * ytop), root);
    }
}

var xleft = 10;
var ytop = 10;
var width = 800;
var height = 600;
var f = Math.sin;
var df = Math.cos;
window.onload = onClick;