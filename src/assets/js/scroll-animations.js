window.initScrollAnimations = function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target); // run only once
      }
    });
  }, {
    threshold: 0.1
  });

  const elements = document.querySelectorAll('.section');
  elements.forEach(el => {
    el.classList.add('before-animate');
    observer.observe(el);
  });
};
