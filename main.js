function setup() {
    createCanvas(800, 800);
    frameRate(20);

    alignSlider = createSlider(0, 2, 1.4, 0.1);
    cohesionSlider = createSlider(0, 2, 0.8, 0.1);
    separationSlider = createSlider(0, 2, 1.6, 0.1);

    swarm = new Swarm();
    swarm.create_pool(64);
}

function draw() {
    background(250);

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