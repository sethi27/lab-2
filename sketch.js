class Ball {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.diameter = 50;
        this.speedX = random(-5, 5);
        this.speedY = random(-5, 5);
        this.color = color(random(255), random(255), random(255));
    }

    move() {
        // Update position
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off walls
        if (this.x + this.diameter/2 > width || this.x - this.diameter/2 < 0) {
            this.speedX *= -1;
        }
        if (this.y + this.diameter/2 > height || this.y - this.diameter/2 < 0) {
            this.speedY *= -1;
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
    // Create 5 balls with random positions
    for (let i = 0; i < 5; i++) {
        balls.push(new Ball(random(width), random(height)));
    }
}

function draw() {
    background(220);
    
    // Update and display all balls
    for (let ball of balls) {
        ball.move();
        ball.display();
    }
}

function mousePressed() {
    // Check if any ball was clicked
    for (let ball of balls) {
        ball.clicked(mouseX, mouseY);
    }
} 