/*
Adapted from: https://alligator.io/js/intersection-observer/
*/

const animate = document.querySelectorAll('.animate');

observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
      entry.target.classList.add('active');
        // if has class once, animate in then unobserve
        if (entry.target.classList.contains('once')){
          observer.unobserve(entry.target);
        }
    } else {
      entry.target.classList.remove('active');
    }
  });
});

animate.forEach(animate => {
  observer.observe(animate);
});