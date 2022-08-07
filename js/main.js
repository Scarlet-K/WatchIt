// carousel
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

// change category
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
      var $aImg = document.createElement('a');
      var $categoryImg = document.createElement('img');
      $aImg.setAttribute('class', 'col-third pd');
      $aImg.setAttribute('href', '#');
      $categoryImg.setAttribute('src', 'https://image.tmdb.org/t/p/w500/' + xhr.response.results[i].poster_path);
      $categoryImg.setAttribute('class', 'border-r');
      $categoryImg.setAttribute('id', xhr.response.results[i].id);
      $aImg.appendChild($categoryImg);
      DOMparent.appendChild($aImg);
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
      var $aImg = document.createElement('a');
      var $categoryImg = document.createElement('img');
      $aImg.setAttribute('class', 'col-third pd');
      $aImg.setAttribute('href', '#');
      $categoryImg.setAttribute('src', 'https://image.tmdb.org/t/p/w500/' + xhr.response.results[i].poster_path);
      $categoryImg.setAttribute('class', 'border-r');
      $categoryImg.setAttribute('id', xhr.response.results[i].id);
      $aImg.appendChild($categoryImg);
      $trending.appendChild($aImg);
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

// navigation bar
var $navView = document.querySelectorAll('.navView');
var $nav = document.querySelector('.nav');

$nav.addEventListener('click', handleNavClick);

function handleNavClick(event) {
  if (!event.target.matches('.nav')) {
    return;
  } var $eventView = event.target.getAttribute('data-view');
  for (var i = 0; i < $navView.length; i++) {
    if ($eventView === $navView[i].getAttribute('data-view')) {
      $navView[i].classList.remove('hidden');
    } else {
      $navView[i].classList.add('hidden');
    }
  }
}

// movie detail
var $home = document.querySelector('.home');
$home.addEventListener('click', handleImgClick);

function handleImgClick(event) {
  if (!event.target.tagName === ('IMG')) {
    return;
  }
  if (event.target.tagName === ('IMG')) {
    var $detail = document.querySelector('.detail');
    var $home = document.querySelector('.home');
    $detail.classList.remove('hidden');
    $home.classList.add('hidden');
    var targetId = event.target.id;
    getDetails(targetId);
  }
}

var $detailPoster = document.querySelector('.detail-poster');
var $detailInfo = document.querySelector('.detail-info');

function getDetails(id) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.themoviedb.org/3/movie/' + id + '?api_key=d7a558bf3c164e7e0d8761462a9973e2&language=en-US');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var $img = document.createElement('img');
    $img.setAttribute('src', 'https://image.tmdb.org/t/p/w500/' + xhr.response.poster_path);
    $detailPoster.appendChild($img);
    var $h2 = document.createElement('h2');
    $h2.textContent = xhr.response.title;
    var $p = document.createElement('p');
    $p.textContent = xhr.response.overview;
    $detailInfo.append($h2, $p);
    var $div = document.createElement('div');
    $div.setAttribute('class', 'pd-tb');
    var $date = document.createElement('h4');
    $date.textContent = 'Release Date';
    var $prod = document.createElement('h4');
    $prod.textContent = 'Production Companies';
    var $genre = document.createElement('h4');
    $genre.textContent = 'Genres';
    var $dateP = document.createElement('p');
    $dateP.textContent = xhr.response.release_date;
    for (var i = 0; i < xhr.response.production_companies.length; i++) {
      var $prodP = document.createElement('p');
      $prodP.textContent = xhr.response.production_companies[i].name;
      $prod.appendChild($prodP);
    }

    for (var k = 0; k < xhr.response.genres.length; k++) {
      var $genreP = document.createElement('p');
      $genreP.textContent = xhr.response.genres[k].name;
      $genre.appendChild($genreP);
    }
    $date.appendChild($dateP);
    $div.append($date, $prod, $genre);
    $detailInfo.appendChild($div);
  });
  xhr.send();
}
