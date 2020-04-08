/*
==================================
======== Animate sections ========
==================================
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



/*
==================================
======== Show more button ========
==================================
*/
function showMore() {
  var x = document.getElementsByClassName("hidden");
	
  var i;
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "block";
	  
  document.getElementById("showMore").style.display = "none";
} 
	
	

};

