// 鼠标点击特效 - 多种图案
(function() {
  // 定义多种特效文字/符号
  const effects = [
    '❤', '💕', '💖', '💗', '💙', '💚', '💛', '💜', '🧡',
    '⭐', '✨', '🌟', '💫', '⚡',
    '🌸', '🌺', '🌻', '🌼', '🌷', '🌹',
    '🦋', '🐝', '🐞',
    '😊', '😄', '😍', '🥰', '😘',
    '👍', '✌️', '🤘', '👏',
    '🎵', '🎶', '🎨', '🎭',
    '404', 'Bug', 'Debug', 'Code', 
    'Hello', 'World', 'Error', 'Success', 
    'Loading', 'Done', 'Run', 'Build',
    'Git', 'Push', 'Pull', 'Commit',
    'API', 'JSON', 'HTML', 'CSS',
    'JS', 'Python', 'Java', 'C++',
    '√', 'OK', 'Yes', 'True',
    'NIPS','ICLR','ICML','ACL','IJCAI','EMNLP','CVPR','SIGKDD','USENIX','CCS','ACCEPT',
    'GPT','Gemini','Claude','Qwen','Deepseek','Grok',
  ];
  
  // 定义多种颜色
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
    '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52B788',
    '#FF6B9D', '#C9ADA7', '#9D84B7', '#FFB4A2', '#B5E7A0',
    '#E63946', '#F1FAEE', '#A8DADC', '#457B9D', '#1D3557'
  ];
  
  // 添加CSS动画
  const style = document.createElement('style');
  style.textContent = `
    @keyframes clickEffect {
      0% {
        opacity: 1;
        transform: translate(0, 0) scale(1) rotate(0deg);
      }
      50% {
        opacity: 0.8;
        transform: translate(var(--tx-mid), -40px) scale(1.3) rotate(var(--rotate-mid));
      }
      100% {
        opacity: 0;
        transform: translate(var(--tx-end), -80px) scale(0.3) rotate(var(--rotate-end));
      }
    }
    
    .click-effect {
      position: fixed;
      pointer-events: none;
      z-index: 9999;
      user-select: none;
      font-weight: bold;
      text-shadow: 0 0 5px rgba(255,255,255,0.5);
    }
  `;
  document.head.appendChild(style);
  
  // 点击事件
  document.addEventListener('click', function(e) {
    // 随机生成4-6个特效
    const count = Math.floor(Math.random() * 3) + 4; // 4到6个
    
    for (let i = 0; i < count; i++) {
      // 为每个特效添加延迟，让它们不是同时出现
      setTimeout(() => {
        // 随机选择一个特效
        const effect = effects[Math.floor(Math.random() * effects.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // 随机偏移位置，让多个特效分散开
        const offsetX = (Math.random() * 60 - 30);
        const offsetY = (Math.random() * 60 - 30);
        
        // 随机动画参数
        const txMid = (Math.random() * 40 - 20) + 'px';
        const txEnd = (Math.random() * 60 - 30) + 'px';
        const rotateMid = (Math.random() * 360) + 'deg';
        const rotateEnd = (Math.random() * 720) + 'deg';
        const fontSize = (Math.random() * 15 + 20) + 'px';
        
        // 创建特效元素
        const element = document.createElement('div');
        element.className = 'click-effect';
        element.textContent = effect;
        element.style.cssText = `
          left: ${e.clientX - 10 + offsetX}px;
          top: ${e.clientY - 10 + offsetY}px;
          color: ${color};
          font-size: ${fontSize};
          --tx-mid: ${txMid};
          --tx-end: ${txEnd};
          --rotate-mid: ${rotateMid};
          --rotate-end: ${rotateEnd};
          animation: clickEffect 1.2s ease-out forwards;
        `;
        
        document.body.appendChild(element);
        
        // 1.2秒后移除元素
        setTimeout(() => {
          element.remove();
        }, 1200);
      }, i * 50); // 每个特效延迟50ms出现
    }
  });
})();
