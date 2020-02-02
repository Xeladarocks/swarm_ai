function setup() {
    createCanvas(800, 800);
    frameRate(60);
    textSize(15);

    alignSlider = createSlider(0, 2, 1.4, 0.1);
    alignSlider.position((windowWidth-width)/2+20, (windowHeight-height)/2+80);
    cohesionSlider = createSlider(0, 2, 0.8, 0.1);
    cohesionSlider.position((windowWidth-width)/2+20, (windowHeight-height)/2+50);
    separationSlider = createSlider(0, 2, 1.6, 0.1);
    separationSlider.position((windowWidth-width)/2+20, (windowHeight-height)/2+20);

    swarm = new Swarm();
    swarm.create_pool(64);
}

function draw() {
    background(250);
    fill(0);
    noStroke();
    text("separation", 30+separationSlider.width, separationSlider.height+15);
    text("cohesion", 30+cohesionSlider.width, cohesionSlider.height+45);
    text("align", 30+alignSlider.width, alignSlider.height+75);

    for(let i=0; i < swarm.boids.length; i++) {
        let boid = swarm.boids[i];
        boid.edges();

        let flock = boid.detect_neighborhood(swarm.boids);
        if(flock.length > 0) {
            boid.flock(flock);
            boid.update();
        } else {
            boid.acceleration = createVector(random(-1, 1), random(-1, 1));
            boid.update();
        }
        boid.draw();
    }
}