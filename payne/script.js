// When the user clicks on a trigger, open the popup

function toggleSlider(id) {
  var slider = document.getElementById(id);
  if (slider.classList.contains('opened')) {
    slider.classList.remove('opened');
    slider.classList.add('closed');
  } else {
    slider.classList.remove('closed');
    slider.classList.add('opened');
  }
}