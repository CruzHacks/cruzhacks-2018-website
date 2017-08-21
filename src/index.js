import {
  TweenMax
} from 'gsap'

require('./style.scss')
var Sketch = require('./sketch.min.js')

/* eslint-disable no-undef */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */

var menu = document.getElementsByClassName('hamburger')[0]
var close = document.getElementsByClassName('hamburger__close')[0]
var mobileNav = document.getElementsByClassName('mobile-nav')[0]
var header = document.getElementsByClassName('header--wrapper')[0]
var body = document.getElementsByTagName('body')[0]

menu.addEventListener('click', (e) => {
  e.preventDefault()
  menu.classList.add('hidden')
  mobileNav.classList.remove('hidden')
  TweenMax.staggerFrom('.mobile-nav__item', 0.5, {
    y: -15,
    opacity: 0
  }, 0.06)
})

close.addEventListener('click', (e) => {
  e.preventDefault()
  menu.classList.remove('hidden')
  mobileNav.classList.add('hidden')
})

TweenMax.delayedCall(0.2, () => {
  TweenMax.staggerTo('.fade-in', 0.5, {
    opacity: 1,
    y: 0
  }, 0.2)
})

function Particle(x, y, radius, lifespan, speed) {
  this.init(x, y, radius, lifespan, speed)
}

Particle.prototype = {
  init: function (x, y, radius, lifespan, speed) {
    this.alive = true

    this.radius = radius
    this.size = 0
    this.wander = 2.15
    this.theta = random(TWO_PI)
    this.drag = 0.2
    this.color = '#fff'

    this.lifespan = lifespan
    this.time = 0.0
    this.delta = speed

    this.x = x || 0.0
    this.y = y || 0.0

    this.vx = 0.0
    this.vy = 0.0
  },
  move: function () {
    this.x += this.vx
    this.y += this.vy

    this.vx *= this.drag
    this.vy *= this.drag

    this.time += this.delta

    this.theta += random(-0.5, 0.5) * this.wander
    this.vx += sin(this.theta) * 0.5
    this.vy += cos(this.theta) * 0.5

    this.size = Math.abs(this.radius * sin(this.time * (PI / this.lifespan)))

    if (this.time >= this.lifespan) this.alive = false
  },
  draw: function (ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, TWO_PI)
    ctx.fillStyle = this.color
    ctx.fill()
  }
}

var MAX_PARTICLES = 30000000
var COLOURS = [
  '#8063D7',
  '#573DA4',
  '#9999FF',
  '#41426B',
  '#503070'
]

var particles = []
var pool = []

var demo = Sketch.create({
  autopause: false,
  container: document.getElementById('container'),
  retina: 'auto'
})

demo.setup = function () {
  var x, y, spawn_circles
  var spawn_radius = 400
  var center_x = demo.width * 0.5
  var center_y = demo.height * 0.5

  function spawnCircles() {
    spawn_circles = setInterval(() => {
      var angle = 2 * PI * random()
      var r = spawn_radius * random()
      x = 1.6 * r * cos(angle) + center_x
      y = 0.9 * r * sin(angle) + center_y
      demo.spawn(x, y, 0, random(0, 0.5), random(COLOURS), random(15, 55), 10, 0.05)
    }, 200)
  }
  spawnCircles()

  window.addEventListener('focus', spawnCircles)
  window.addEventListener('blur', () => {
    clearInterval(spawn_circles)
  })

}

demo.spawn = function (x, y, wander, drag, color, radius, lifespan, speed) {
  var particle, theta, force

  if (particles.length >= MAX_PARTICLES) {
    pool.push(particles.shift())
  }

  particle = pool.length ? pool.pop() : new Particle()
  particle.init(x, y, radius, lifespan, speed)

  particle.wander = wander
  particle.color = color
  particle.drag = drag

  theta = random(TWO_PI)
  force = 10

  particle.vx = sin(theta) * force
  particle.vy = cos(theta) * force

  particles.push(particle)
}

demo.update = function () {
  var i, particle

  for (i = particles.length - 1; i >= 0; i--) {
    particle = particles[i]

    if (particle.alive) particle.move()
    else pool.push(particles.splice(i, 1)[0])
  }
}
demo.draw = function () {
  demo.globalCompositeOperation = 'lighter'

  for (var i = particles.length - 1; i >= 0; i--) {
    particles[i].draw(demo)
  }
}

var scrollpos = 0;
var active = false;

function scrollHandler(scrollpos) {
  console.log(scrollpos)
  if (scrollpos > 40) {
    header.style.height = '50px'
    //body.style.border = '0 rgb(229, 232, 255) solid'
  } else if (scrollpos <= 20) {
    header.style.height = '75px'
    //body.style.border = '20px rgb(229, 232, 255) solid'
    //body.style.borderBottom = '0'
  }
}

window.addEventListener('scroll', function (e) {
  scrollpos = window.scrollY;
  if (!active) {
    window.requestAnimationFrame(function () {
      scrollHandler(scrollpos);
      active = false;
    });
  }
  active = true;
});
