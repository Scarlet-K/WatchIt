var images = ['images/topgun.jpg', 'images/parasite.jpg', 'images/jurassic.jpg', 'images/lightyear.jpg', 'images/lord.jpg', 'images/pulp.jpg', 'images/gray man.jpg', 'images/name.jpg'];
var $img = document.querySelector('img');
var intervalID = setInterval(getNextIndex, 3000);
var index = 0;
var $leftArrow = document.querySelector('.fa-chevron-left');
var $rightArrow = document.querySelector('.fa-chevron-right');
var $circleList = document.querySelectorAll('.fa-circle');
var $circleContainer = document.querySelector('.circle-container');

$leftArrow.addEventListener('click', showPreviousImage);
$rightArrow.addEventListener('click', showNextImage);
$circleContainer.addEventListener('click', handleCircles);

function showPreviousImage(event) {
  getPreviousIndex();
  setIndex();
}

function showNextImage(event) {
  getNextIndex();
  setIndex();
}

function handleCircles(event) {
  if (event.target.tagName === 'I') {
    setIndex();
    var dataIndex = event.target.getAttribute('data-index');
    index = dataIndex;
    for (var i = 0; i < $circleList.length; i++) {
      if (JSON.stringify(i) === dataIndex) {
        $img.setAttribute('src', images[i]);
        $circleList[i].classList.add('fa-solid');
        $circleList[i].classList.remove('fa-regular');
      } else {
        $circleList[i].classList.add('fa-regular');
        $circleList[i].classList.remove('fa-solid');
      }
    }
  }
}

function getPreviousIndex() {
  if (index !== 0) {
    index--;
    $img.setAttribute('src', images[index]);
    $circleList[index].classList.add('fa-solid');
    $circleList[index].classList.remove('fa-regular');
    $circleList[index + 1].classList.remove('fa-solid');
    $circleList[index + 1].classList.add('fa-regular');
  } else {
    index = images.length - 1;
    $img.setAttribute('src', images[index]);
    $circleList[images.length - 1].classList.add('fa-solid');
    $circleList[images.length - 1].classList.remove('fa-regular');
    $circleList[0].classList.remove('fa-solid');
    $circleList[0].classList.add('fa-regular');
  }
}

function getNextIndex() {
  if (index < images.length - 1) {
    index++;
    $img.setAttribute('src', images[index]);
    $circleList[index].classList.add('fa-solid');
    $circleList[index].classList.remove('fa-regular');
    $circleList[index - 1].classList.remove('fa-solid');
    $circleList[index - 1].classList.add('fa-regular');
  } else {
    index = 0;
    $img.setAttribute('src', images[0]);
    $circleList[0].classList.add('fa-solid');
    $circleList[0].classList.remove('fa-regular');
    $circleList[images.length - 1].classList.remove('fa-solid');
    $circleList[images.length - 1].classList.add('fa-regular');
  }
}

function setIndex() {
  clearInterval(intervalID);
  intervalID = setInterval(getNextIndex, 3000);
}
