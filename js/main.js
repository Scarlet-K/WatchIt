function getNowPlayingImg() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.themoviedb.org/3/movie/now_playing?api_key=d7a558bf3c164e7e0d8761462a9973e2');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    for (var i = 0; i < 8; i++) {
      images.push('https://image.tmdb.org/t/p/w500/' + xhr.response.results[i].poster_path);
      $carouselImg.setAttribute('src', images[0]);
    }
  });
  xhr.send();
}

getNowPlayingImg();

var images = [];
var $carouselImg = document.querySelector('.carousel-image');
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
        $carouselImg.setAttribute('src', images[i]);
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
    $carouselImg.setAttribute('src', images[index]);
    $circleList[index].classList.add('fa-solid');
    $circleList[index].classList.remove('fa-regular');
    $circleList[index + 1].classList.remove('fa-solid');
    $circleList[index + 1].classList.add('fa-regular');
  } else {
    index = images.length - 1;
    $carouselImg.setAttribute('src', images[index]);
    $circleList[images.length - 1].classList.add('fa-solid');
    $circleList[images.length - 1].classList.remove('fa-regular');
    $circleList[0].classList.remove('fa-solid');
    $circleList[0].classList.add('fa-regular');
  }
}

function getNextIndex() {
  if (index < images.length - 1) {
    index++;
    $carouselImg.setAttribute('src', images[index]);
    $circleList[index].classList.add('fa-solid');
    $circleList[index].classList.remove('fa-regular');
    $circleList[index - 1].classList.remove('fa-solid');
    $circleList[index - 1].classList.add('fa-regular');
  } else {
    index = 0;
    $carouselImg.setAttribute('src', images[0]);
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
