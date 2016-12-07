"use strict";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
ctx.font="25px Arial";
let drawCount = 0;
let star;

function setup() {
    star = new Body(50, 0, 0, new Color(255, 180, 0, 0.75), 3);
}

function draw() {
    window.requestAnimationFrame(draw);
    drawCount++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    star.draw();
    star.update();
    ctx.restore();
}

class Body {
    constructor(r, d, a, c, l) {
        this.radius = r;
        this.distance = d;
        this.angle = a;
        this.color = c;
        this.level = l;
        this.satellites = [];
        let nsat = rand(0, this.level);
        for (let i = 0; i < nsat; i++) {
            let sr = rand(this.radius / 2, this.radius / 4);
            let sd = this.radius + rand(this.radius, 3 * this.radius);
            let sa = rand(0, 2* Math.PI);
            let sc = new Color(100, 0, 100, 0.75);
            this.satellites.push(new Body(sr, sd, sa, sc, l - 1));
        }
    }

    update() {
        this.angle += 1 / this.distance;
        this.satellites.forEach(function(element) {
            element.update();
        }, this);
    }

    draw() {
        ctx.save();
        ctx.rotate(this.angle);
        ctx.translate(this.distance, 0);
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        this.satellites.forEach(function(element) {
            element.draw();
        }, this);
        ctx.restore();
    }
}

class Color {
    constructor(r, g, b ,a) {
        this.r = r || 0;
        this.g = g || 0;
        this.b = b || 0;
        this.a = a || 1.0;
    }

    toString() {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;    
}

setup();
draw();