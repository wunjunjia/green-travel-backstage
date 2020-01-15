function throttle(fn, delay = 300) {
  let timer = null;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      clearTimeout(timer);
      fn();
    }, delay);
  };
}

class Particle {
  constructor({
    x,
    y,
    size,
    speedX = 0.1,
    speedY = 0.1,
    directionX = 1,
    directionY = 1,
  }) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speedX = speedX;
    this.speedY = speedY;
    this.directionX = directionX;
    this.directionY = directionY;
  }
}

class ParticleAnimation {
  constructor({
    el,
    number,
    shape = 'circle',
    opacity = 0.2,
    minSpeed = 0.1,
    maxSpeed = 0.7,
    maxSize = 25,
    minSize = 5,
    distance = 150,
  }) {
    this.el = el;
    this.ctx = el.getContext('2d');
    this.shape = shape;
    this.opacity = opacity;
    this.minSpeed = minSpeed;
    this.maxSpeed = maxSpeed;
    this.maxSize = maxSize;
    this.minSize = minSize;
    this.distance = distance;
    this.number = number || Math.floor(el.parentNode.offsetWidth * el.parentNode.offsetHeight / 22500);
    this.particles = [];
    this.init();
  }

  canvasStyle = () => {
    this.el.width = this.el.parentNode.offsetWidth;
    this.el.height = this.el.parentNode.offsetHeight;
  }

  createParticles = () => {
    for (let i = 0; i < this.number; i += 1) {
      this.particles.push(new Particle({
        x: Math.floor(Math.random() * (this.el.width - 2 * this.maxSize) + this.maxSize),
        y: Math.floor(Math.random() * (this.el.height - this.maxSize) + this.maxSize),
        size: Math.floor(Math.random() * (this.maxSize - this.minSize) + this.minSize),
        speedX: Math.floor((Math.random() * (this.maxSpeed - this.minSpeed) + this.minSpeed) * 10) / 10,
        speedY: Math.floor((Math.random() * (this.maxSpeed - this.minSpeed) + this.minSpeed) * 10) / 10,
        directionX: Math.random() < 0.5 ? -1 : 1,
        directionY: Math.random() < 0.5 ? -1 : 1,
      }));
    }
  }

  updateParticles = () => {
    for (let i = 0; i < this.particles.length; i += 1) {
      const particle = this.particles[i];
      const x = particle.x + particle.speedX * particle.directionX;
      particle.x = x;
      const y = particle.y + particle.speedY * particle.directionY;
      particle.y = y;
      if (particle.x >= this.el.width - particle.size || particle.x <= particle.size) particle.directionX = -particle.directionX;
      if (particle.y >= this.el.height - particle.size || particle.y <= particle.size) particle.directionY = -particle.directionY;
    }
  }

  drawParticles = () => {
    this.ctx.clearRect(0, 0, this.el.width, this.el.height);
    this.ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    this.particles.forEach((particle) => {
      this.drawShap(particle);
    });
  }

  drawShap(particle) {
    switch (this.shape) {
      case 'circle':
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, 2 * Math.PI, true);
        this.ctx.fill();
        this.ctx.closePath();
        break;
      case 'heart':
        this.ctx.save();
        this.ctx.translate(particle.x, particle.y);
        this.ctx.rotate(Math.PI / 4);
        this.ctx.beginPath();
        this.ctx.fillRect(-particle.size, -particle.size, 2 * particle.size, 2 * particle.size);
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.beginPath();
        this.ctx.arc(-particle.size, 0, particle.size, Math.PI / 2, 3 * Math.PI / 2);
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.beginPath();
        this.ctx.arc(0, -particle.size, particle.size, Math.PI, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();
        break;
      default:
        break;
    }
  }

  drawLine() {
    for (let i = 0; i < this.particles.length; i += 1) {
      const a = this.particles[i];
      for (let j = 0; j < this.particles.length; j += 1) {
        const b = this.particles[j];
        const distance = Math.floor(Math.sqrt(((a.x - b.x) ** 2) + ((a.y - b.y) ** 2)));
        if (distance < this.distance) {
          const opacity = 1 - Math.floor((distance / this.distance) * 10) / 10;
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity > 0.6 ? 0.6 : opacity})`;
          this.ctx.moveTo(a.x, a.y);
          this.ctx.lineTo(b.x, b.y);
          this.ctx.stroke();
          this.ctx.closePath();
        }
      }
    }
  }

  animation = () => {
    this.updateParticles();
    this.drawParticles();
    this.drawLine();
    this.key = requestAnimationFrame(this.animation);
  }

  init = () => {
    this.canvasStyle();
    this.createParticles();
    this.drawParticles();
    this.key = requestAnimationFrame(this.animation);
    window.addEventListener('resize', this.resizeHandler);
  }

  resizeHandler = throttle(() => {
    cancelAnimationFrame(this.key);
    this.number = Math.floor(this.el.parentNode.offsetWidth * this.el.parentNode.offsetHeight / 22500);
    this.particles = [];
    this.canvasStyle();
    this.createParticles();
    this.key = requestAnimationFrame(this.animation);
  });

  destroy() {
    cancelAnimationFrame(this.key);
    window.removeEventListener('resize', this.resizeHandler);
  }
}

export default ParticleAnimation;