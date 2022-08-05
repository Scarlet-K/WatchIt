var images = [];
var $carouselImg = document.querySelector('.carousel-image');
var intervalID = setInterval(getNextIndex, 3000);
var index = 0;
var $leftArrow = document.querySelector('.fa-chevron-left');
var $rightArrow = document.querySelector('.fa-chevron-right');
$leftArrow.addEventListener('click', showPreviousImage);
$rightArrow.addEventListener('click', showNextImage);

function showPreviousImage(event) {
  getPreviousIndex();
  setIndex();
}
function showNextImage(event) {
  getNextIndex();
  setIndex();
}
function getPreviousIndex() {
  if (index !== 0) {
    index--;
    $carouselImg.setAttribute('src', images[index]);
  } else {
    index = images.length - 1;
    $carouselImg.setAttribute('src', images[index]);
  }
}
function getNextIndex() {
  if (index < images.length - 1) {
    index++;
    $carouselImg.setAttribute('src', images[index]);
  } else {
    index = 0;
    $carouselImg.setAttribute('src', images[0]);
  }
}
function setIndex() {
  clearInterval(intervalID);
  intervalID = setInterval(getNextIndex, 3000);
}

function getCarouselImg() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.themoviedb.org/3/movie/now_playing?api_key=d7a558bf3c164e7e0d8761462a9973e2');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    for (var i = 0; i < xhr.response.results.length; i++) {
      images.push('https://image.tmdb.org/t/p/w500/' + xhr.response.results[i].poster_path);
      $carouselImg.setAttribute('src', images[0]);
    }
  });
  xhr.send();
}
getCarouselImg();

// change category view //
var $topRated = document.querySelector('.top-rated');
var $trending = document.querySelector('.trending');
var $popular = document.querySelector('.popular');
var $upcoming = document.querySelector('.upcoming');

function getCategoryImg(string, DOMparent) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.themoviedb.org/3/movie/' + string + '?api_key=d7a558bf3c164e7e0d8761462a9973e2&language=en-US');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    for (var i = 0; i < xhr.response.results.length; i++) {
      var $categoryImg = document.createElement('img');
      var $divCol = document.createElement('div');
      $categoryImg.setAttribute('src', 'https://image.tmdb.org/t/p/w500/' + xhr.response.results[i].poster_path);
      $categoryImg.setAttribute('class', 'border-r');
      $divCol.setAttribute('class', 'col-third pd');
      $divCol.appendChild($categoryImg);
      DOMparent.appendChild($divCol);
    }
  });
  xhr.send();
}

function getTrendingImg() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.themoviedb.org/3/trending/movie/week?api_key=d7a558bf3c164e7e0d8761462a9973e2&language=en-US');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    for (var i = 0; i < xhr.response.results.length; i++) {
      var $categoryImg = document.createElement('img');
      var $divCol = document.createElement('div');
      $categoryImg.setAttribute('src', 'https://image.tmdb.org/t/p/w500/' + xhr.response.results[i].poster_path);
      $categoryImg.setAttribute('class', 'border-r');
      $divCol.setAttribute('class', 'col-third pd');
      $divCol.appendChild($categoryImg);
      $trending.appendChild($divCol);
    }
  });
  xhr.send();
}

getCategoryImg('top_rated', $topRated);
getTrendingImg();
getCategoryImg('popular', $popular);
getCategoryImg('upcoming', $upcoming);

var $tabContainer = document.querySelector('.tab-container');
var $tabList = document.querySelectorAll('.tab');
var $viewList = document.querySelectorAll('.view');
$tabContainer.addEventListener('click', handleTabClick);

function handleTabClick(event) {
  if (!event.target.matches('.tab')) {
    return;
  }
  for (var i = 0; i < $tabList.length; i++) {
    if (event.target === $tabList[i]) {
      $tabList[i].classList.add('active');
    } else {
      $tabList[i].classList.remove('active');
    }
  }

  var $eventView = event.target.getAttribute('data-view');

  for (var k = 0; k < $viewList.length; k++) {
    if ($eventView === $tabList[k].getAttribute('data-view')) {
      $viewList[k].classList.remove('hidden');
    } else {
      $viewList[k].classList.add('hidden');
    }
  }
}
