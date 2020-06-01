// simplified idea from www.beargrylls.com

const frame = document.querySelector('.landing'),
mountainMid = document.querySelector('.landing__center'),
mountainFront = document.querySelector('.landing__front'),
walk = { x: 0, y: 2 };

let animating = true;

// offsets
const maxH = frame.offsetHeight * 2;

function scrollThrough() {
  const scrolled = window.pageYOffset;
  // console.log(scrolled, maxH);

  let yWalk = Math.ceil(scrolled * 9 / maxH);

  if (yWalk < 0) {
    yWalk = 0;
  }if (yWalk === 0.9) {
    yWalk = 0.9;
  }

  let scale = '1.' + yWalk,
  opacity = 1 - ('0.' + yWalk);

  if (opacity < 0.1) {
    opacity = 0;
    animating = false;
  }

  if (animating === true) {
    document.documentElement.style.setProperty('--opacity', opacity);
    document.documentElement.style.setProperty('--scale', scale);
  } else {
    console.log('else');
    document.documentElement.style.setProperty('--opacity', '0');

  }

  if (scrolled > maxH) {
    animating = false;
  } else if (scrolled <= maxH) {
    animating = true;
  }
}

function setup() {
  const offset = frame.offsetHeight * 2,
  docHeight = document.body.scrollHeight;
  document.documentElement.style.setProperty('--offset', offset + 'px');
  document.documentElement.style.setProperty('--docHeight', docHeight + 'px');
}

window.onscroll = scrollThrough;
window.onload = setup;