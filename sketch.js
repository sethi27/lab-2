class Ball {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.diameter = 100;
        this.speedX = random(-5, 5);
        this.speedY = random(-5, 5);
        this.color = color(random(255), random(255), random(255));
    }

    move() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x + this.diameter/2 > width || this.x - this.diameter/2 < 0) {
            this.speedX *= -1;
        }
        if (this.y + this.diameter/2 > height || this.y - this.diameter/2 < 0) {
            this.speedY *= -1;
        }

        for (let other of balls) {
            if (other !== this) { 
                let d = dist(this.x, this.y, other.x, other.y);
                let minDist = (this.diameter + other.diameter) / 2;
                
                if (d < minDist) {
                    let angle = atan2(other.y - this.y, other.x - this.x);
                    
                    let overlap = minDist - d;
                    let moveX = overlap/2 * cos(angle);
                    let moveY = overlap/2 * sin(angle);
                    
                    this.x -= moveX;
                    this.y -= moveY;
                    other.x += moveX;
                    other.y += moveY;
                    
                    let tempSpeedX = this.speedX;
                    let tempSpeedY = this.speedY;
                    this.speedX = other.speedX;
                    this.speedY = other.speedY;
                    other.speedX = tempSpeedX;
                    other.speedY = tempSpeedY;
                }
            }
        }
    }

    display() {
        fill(this.color);
        noStroke();
        circle(this.x, this.y, this.diameter);
    }

    clicked(px, py) {
        let d = dist(px, py, this.x, this.y);
        if (d < this.diameter/2) {
            this.color = color(random(255), random(255), random(255));
        }
    }
}

let balls = [];

function setup() {
    createCanvas(800, 600);
    for (let i = 0; i < 5; i++) {
        balls.push(new Ball(random(width), random(height)));
    }
}

function draw() {
    background(220);
    
    for (let ball of balls) {
        ball.move();
        ball.display();
    }
}

function mousePressed() {
    for (let ball of balls) {
        ball.clicked(mouseX, mouseY);
    }
} 