/**
 * Created by SeTSeR on 12.09.2016.
 */
'use strict';

function integrate(f, a, b, eps) {
    var n = 1000;
    var step = (b - a) / n;
    var sum1 = 0;
    var sum2 = 0;
    for(var i = 0; i < n; ++i) {
        sum2 += 0.5 * (f(a + i * step) + f(a + (i + 1) * step)) * step;
    }
    while(Math.abs(sum2 - sum1) > eps) {
        n *= 2;
        step = (b - a) / n;
        sum1 = sum2;
        sum2 = 0;
        for(i = 0; i < n; ++i) {
            sum2 += 0.5 * (f(a + i * step) + f(a + (i + 1) * step)) * step;
        }
    }
    return sum2;
}

function solve(f, df, x0, eps) {
    var iterations = new Array();
    var x1 = x0 - f(x0)/df(x0);
    iterations.push(x0, x1);
    while(Math.abs(x1 - x0) > eps) {
        x0 = x1;
        x1 = x0 - f(x0)/df(x0);
        iterations.push(x1);
    }
    return iterations;
}