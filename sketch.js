//2D visibility
// Ray Casting

let source = { pos: null, rays: [] }
let walls = []
let xoff = 10, yoff = 1000

function setup() {
  createCanvas(400, 400);

  source.pos = createVector(width / 2, height / 2)
  for (let i = 0; i < 360; i += 2) {
    source.rays.push(
      new Ray(source.pos, radians(i))
    )
  }

  for (let n = 0; n < 5; n++) {
    let x1 = random(width)
    let x2 = random(width)
    let y1 = random(height)
    let y2 = random(height)

    walls.push(new Boundary(x1, y1, x2, y2))
  }
  walls.push(new Boundary(0, 0, width, 0)) // top
  walls.push(new Boundary(0, 0, 0, height)) // left
  walls.push(new Boundary(width, 0, width, height)) // right
  walls.push(new Boundary(width, height, 0, height)) // bottom
}

function draw() {
  background(0)
  for (let wall of walls) {
    wall.show()
  }

  ellipse(source.pos.x, source.pos.y, 10);
  move(source)

  for (let ray of source.rays) {
    let closest
    let record = Infinity
    for (let wall of walls) {
      let pt = ray.cast(wall)
      if (pt) {
        const d = p5.Vector.dist(ray.pos, pt)
        if (d < record) {
          record = d
          closest = pt
        }
      }
    }

    if (closest) {
      stroke(255, 100);
      line(ray.pos.x, ray.pos.y, closest.x, closest.y)
    }
  }
}

function move(source) {
  source.pos.set(mouseX, mouseY)
  // source.pos.set(noise(xoff) * width, noise(yoff) * height)
  // xoff += 0.005
  // yoff += 0.005
}