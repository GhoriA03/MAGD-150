let scribble, mySound;
let tinyStars = [];
let bigStars = [];

function preload() {
  mySound = loadSound("sound-effect-twinklesparkle-115095.mp3");
}

function setup() {
  createCanvas(400, 400);
  scribble = new Scribble();

  // tiny stars
  for (let i = 0; i < 150; i++) {
    tinyStars.push({ x: random(width), y: random(height), s: random(1, 2.2) });
  }
}

function draw() {
  drawSky();
  drawTinyStars();
  bigStars.forEach(s => drawBigStar(s));
}

function mousePressed() {
  bigStars.push({
    x: mouseX,
    y: mouseY,
    size: random(18, 34),
    phase: random(TWO_PI)
  });

  if (!mySound.isPlaying()) mySound.play();
}

function drawSky() {
  for (let y = 0; y < height; y++) {
    let t = y / height;
    stroke(10, 18 + t * 20, 40 + t * 30);
    line(0, y, width, y);
  }
}

function drawTinyStars() {
  noStroke();
  fill(255, 235, 190, 230);
  tinyStars.forEach(s => circle(s.x, s.y, s.s));
}

function getStarPoints(outer, inner) {
  let pts = [];
  let step = TWO_PI / 10;
  for (let i = 0; i < 10; i++) {
    let r = i % 2 == 0 ? outer : inner;
    let a = -HALF_PI + i * step;
    pts.push({ x: cos(a) * r, y: sin(a) * r });
  }
  return pts;
}

function drawBigStar(s) {
  push();
  translate(s.x, s.y);

  let pulse = sin(frameCount * 0.06 + s.phase) * 3;
  let outer = s.size + pulse;
  let inner = outer * 0.45;

  fill(255, 245, 210, 140);
  ellipse(0, 0, outer * 1.7);

  let pts = getStarPoints(outer, inner);

  fill(255, 220, 140);
  beginShape();
  pts.forEach(p => vertex(p.x, p.y));
  endShape(CLOSE);

  stroke(240, 200, 110);
  noFill();
  for (let i = 0; i < pts.length; i++) {
    let a = pts[i];
    let b = pts[(i+1)%pts.length];
    scribble.scribbleLine(a.x, a.y, b.x, b.y);
  }

  pop();
}