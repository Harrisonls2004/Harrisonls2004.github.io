/**
 * 樱花飘落特效
 */
class Sakura {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.petals = [];
    this.petalCount = 30; // 花瓣数量
    console.log('Sakura effect initializing...');
    this.init();
  }

  init() {
    // 创建 canvas
    this.canvas = document.createElement('canvas');
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '9999';
    document.body.appendChild(this.canvas);
    
    console.log('Canvas created and appended to body');

    this.ctx = this.canvas.getContext('2d');
    this.resize();

    // 创建花瓣
    for (let i = 0; i < this.petalCount; i++) {
      this.petals.push(this.createPetal());
    }
    
    console.log(`Created ${this.petalCount} petals`);

    // 监听窗口大小变化
    window.addEventListener('resize', () => this.resize());

    // 开始动画
    this.animate();
    console.log('Animation started');
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createPetal() {
    return {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height - this.canvas.height,
      size: Math.random() * 10 + 10,
      speedY: Math.random() * 1 + 0.5,
      speedX: Math.random() * 0.5 - 0.25,
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 2 - 1,
      opacity: Math.random() * 0.5 + 0.3,
      swing: Math.random() * 2,
      swingSpeed: Math.random() * 0.02 + 0.01
    };
  }

  drawPetal(petal) {
    this.ctx.save();
    this.ctx.globalAlpha = petal.opacity;
    this.ctx.translate(petal.x, petal.y);
    this.ctx.rotate((petal.rotation * Math.PI) / 180);

    // 绘制花瓣形状
    this.ctx.beginPath();
    this.ctx.fillStyle = '#ffb7d5'; // 粉色花瓣
    
    // 花瓣形状（椭圆）
    this.ctx.ellipse(0, 0, petal.size, petal.size * 0.6, 0, 0, Math.PI * 2);
    this.ctx.fill();

    // 添加花瓣纹理
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.moveTo(-petal.size * 0.5, 0);
    this.ctx.lineTo(petal.size * 0.5, 0);
    this.ctx.stroke();

    this.ctx.restore();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.petals.forEach((petal) => {
      // 更新位置
      petal.y += petal.speedY;
      petal.x += petal.speedX + Math.sin(petal.swing) * 0.5;
      petal.rotation += petal.rotationSpeed;
      petal.swing += petal.swingSpeed;

      // 如果花瓣落到底部，重新从顶部开始
      if (petal.y > this.canvas.height) {
        petal.y = -20;
        petal.x = Math.random() * this.canvas.width;
      }

      // 如果花瓣飘出左右边界，重新定位
      if (petal.x < -20) {
        petal.x = this.canvas.width + 20;
      } else if (petal.x > this.canvas.width + 20) {
        petal.x = -20;
      }

      this.drawPetal(petal);
    });

    requestAnimationFrame(() => this.animate());
  }
}

// 页面加载完成后启动
if (document.readyState === 'loading') {
  console.log('Waiting for DOMContentLoaded...');
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded fired, creating Sakura instance');
    new Sakura();
  });
} else {
  console.log('DOM already loaded, creating Sakura instance immediately');
  new Sakura();
}
