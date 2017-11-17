import {
  TweenMax
} from 'gsap'
import ScrollToPlugin from "gsap/ScrollToPlugin";
const ScrollMagic = require('ScrollMagic');
require('animation.gsap');
require('debug.addIndicators');
const TimelineMax = require('TimelineMax');

require('./style.scss')
var Sketch = require('./sketch.min.js')

/* eslint-disable no-undef */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */

var menu = document.getElementsByClassName('hamburger')[0]
var close = document.getElementsByClassName('hamburger__close')[0]
var mobileNav = document.getElementsByClassName('mobile-nav')[0]
var header_wrap = document.getElementsByClassName('header--wrapper')[0]
var header = document.getElementsByTagName('header')[0]
var body = document.getElementsByTagName('body')[0]
var navlink = document.getElementsByClassName('hash-link')
var smooth = document.getElementsByClassName('smooth')

document.getElementsByClassName('year')[0].innerHTML = new Date().getFullYear();

// Initial pageload fade in
TweenMax.delayedCall(0.2, () => {
  TweenMax.staggerTo('.fade-in', 0.5, {
    delay: .4,
    opacity: 1,
    y: 0
  }, 0.2)
})

// Application Reminder Form
$('.notifications--cta').on('click', () => {
  $('.notifications--cta').fadeOut(() => {
    $('#contact-form').css("display", "flex").hide().fadeIn()
  })
})
var form = $('#contact-form')
var formMessages = $('#form-messages')
$(form).submit(function (event) {
  $(form).animate({
    opacity: 0
  }, 500, function () {
    $(form).css('display', 'none')
    $(formMessages).removeClass('error')
    $(formMessages).addClass('success')
    $(formMessages).html('<p class="notifications">Thank you! We\'ll email when applications open.</p>')
    $(formMessages).fadeIn()
  })
})


// Scrollmagic card trigger
var controller = new ScrollMagic.Controller()
var stagger = TweenMax.staggerFrom('.card', 0.5, {
  opacity: 0,
  y: '20px'
}, 0.2)
var scene = new ScrollMagic.Scene({
  triggerElement: '#cardtrigger'
}).setTween(stagger).addTo(controller)

// Navlink fade anim
for (var i = 0; i < navlink.length; i++) {
  navlink[i].addEventListener('click', function gotoHash(e) {
    e.preventDefault()
    menu.classList.remove('hidden')
    mobileNav.classList.add('hidden')
    var href = this.href

    TweenMax.to('main', .1, {
      opacity: 0,
      onComplete: () => {
        window.location = href;
        TweenMax.to('main', .1, {
          opacity: 1
        })
      }
    })
  })
}

// "Learn more" smooth scroll
for (var i = 0; i < smooth.length; i++) {
  smooth[i].addEventListener('click', function scrollSmooth(e) {
    e.preventDefault()
    TweenLite.to(window, 1, {
      scrollTo: document.getElementById('about').offsetTop
    })
  })
}

// Mobile menu animation
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

/* Removing hero particles for now
// Hero particles
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
var MAX_PARTICLES = 100
var COLOURS = [
  '#8063D7',
  '#573DA4',
  '#9999FF',
  '#41426B',
  '#503070'
]

var particles = []
var pool = []

var pings = []

var demo = Sketch.create({
  autopause: false,
  container: document.getElementById('container'),
  retina: 'auto'
})

demo.setup = function () {
  var x, y, inner_x1, inner_y1, inner_x2, inner_y2, spawn_circles
  var spawn_radius = 400
  var center_x = demo.width * 0.5
  var center_y = demo.height * 0.5

  function spawnCircles() {
    spawn_circles = setInterval(() => {
      var angle = 2 * PI * random()
      var r = spawn_radius * random()
      x = 1.6 * r * cos(angle) + center_x
      y = r * sin(angle) + center_y
      inner_x2 = center_x + (spawn_radius / 1.33)
      inner_y2 = center_y + (spawn_radius / 1.33)
      inner_x1 = center_x - (spawn_radius / 1.33)
      inner_y1 = center_y - (spawn_radius / 1.33)
      if (x > inner_x2 || y > inner_y2 || x < inner_x1 || y < inner_y1)
        demo.spawn(x, y, 0, random(0, 0.5), random(COLOURS), random(10, 100), 10, 0.05)
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
}*/

/*var radar_pool = []

function Sonar(x, y, radius, lifespan, speed) {
  this.init(x, y, radius, lifespan, speed)
}

Sonar.prototype = {
  init: function (x, y, radius, lifespan, speed) {
    this.alive = true

    this.radius = radius
    this.size = 0

    this.opacity = 1
    this.color = '#ff0'
    
    this.lifespan = lifespan
    this.time = 0.0
    this.delta = speed

    this.x = x || (window.innerWidth / 2)
    this.y = y || (window.innerHeight / 2)
  },
  move: function () {
    this.time += this.delta
    this.opacity = 0.33 * sin(this.size * (PI / this.radius))
    this.size = (this.radius / this.lifespan) * this.time
    if (this.time >= this.lifespan) this.alive = false
  },
  draw: function (ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, TWO_PI)

    ctx.fillStyle = this.color + this.opacity + ')'
    ctx.strokeStyle = this.color + (2 * this.opacity) + ')'
    ctx.lineWidth = 3

    ctx.fill()
    ctx.stroke()
  }
}

var radar = Sketch.create({
  autopause: false,
  container: document.getElementById('radar'),
  retina: 'auto'
})

radar.setup = function () {
  var x, y, spawn_radar
  var center_x = radar.width * 0.5
  var center_y = radar.height * 0.5

  function spawnRadar() {
    spawn_radar = setInterval(() => {
      radar.spawn(center_x, center_y, 'rgba(235, 215, 235, ', 500, 20, 0.10)
    }, 3000)
  }

  spawnRadar()
  window.addEventListener('focus', spawnRadar)
  window.addEventListener('blur', () => {
    clearInterval(spawn_radar)
  })
}

radar.spawn = function (x, y, color, radius, lifespan, speed) {
  var sonar = new Sonar()
  sonar.init(x, y, radius, lifespan, speed)
  sonar.color = color
  pings.push(sonar)
}
radar.update = function () {
  var j, ping

  for (j = pings.length - 1; j >= 0; j--) {
    ping = pings[j]

    if (ping.alive) ping.move()
    else radar_pool.push(pings.splice(j, 1)[0])
  } 
}
radar.draw = function () {
  //radar.globalCompositeOperation = 'lighter'

  for (var j = pings.length - 1; j >= 0; j--) {
    pings[j].draw(radar)
  }
} */

var scrollpos = 0;
var active = false;

// Handle nav scrolling
function scrollHandler(scrollpos) {
  /*if (scrollpos > 40) {
    header_wrap.style.height = '50px'
  } else if (scrollpos <= 20) {
    header_wrap.style.height = '75px'
  }*/
  if (scrollpos > 550) {
    //header.style.backgroundColor = 'rgba(255,255,255,1)'
    header.style.opacity = '1'
    header_wrap.style.height = '50px'

  } else if (scrollpos <= 500) {
    header.style.opacity = '0'
    header_wrap.style.height = '75px'
    //header.style.backgroundColor = 'rgba(255,255,255,0)'
  }
}

// Scroll listener
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
