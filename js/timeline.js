(function() {
  function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineLine = document.querySelector('.timeline-line');
    
    if (timelineItems.length === 0) return;
    
    // Animação da linha vertical conforme o scroll
    function animateTimelineLine() {
      if (!timelineLine) return;
      
      const timeline = document.querySelector('.timeline');
      if (!timeline) return;
      
      // Cria ou obtém a div de progresso
      let progressLine = timelineLine.querySelector('.timeline-line-progress');
      if (!progressLine) {
        progressLine = document.createElement('div');
        progressLine.className = 'timeline-line-progress';
        timelineLine.appendChild(progressLine);
      }
      
      const timelineTop = timeline.offsetTop;
      const timelineHeight = timeline.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollPosition = window.scrollY + windowHeight / 2;
      
      // Calcula a porcentagem de scroll dentro da timeline
      const scrollStart = timelineTop;
      const scrollEnd = timelineTop + timelineHeight;
      const scrollRange = scrollEnd - scrollStart;
      
      if (scrollRange <= 0) {
        progressLine.style.height = '0%';
        return;
      }
      
      const scrollProgress = Math.max(0, Math.min(1, (scrollPosition - scrollStart) / scrollRange));
      
      // Atualiza a altura da linha animada
      progressLine.style.height = (scrollProgress * 100) + '%';
    }
    
    // Inicializa animações AOS
    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }
    
    // Anima a linha no scroll
    window.addEventListener('scroll', animateTimelineLine);
    window.addEventListener('resize', animateTimelineLine);
    animateTimelineLine(); // Inicializa
    
    // Atualiza quando AOS anima elementos
    timelineItems.forEach((item) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateTimelineLine();
          }
        });
      }, { threshold: 0.1 });
      
      observer.observe(item);
    });
  }
  
  function waitForAOS() {
    if (typeof AOS !== 'undefined') {
      initTimelineAnimations();
    } else {
      setTimeout(waitForAOS, 50);
    }
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForAOS);
  } else {
    waitForAOS();
  }
})();

