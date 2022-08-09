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
    $carouselImg.setAttribute('src', images[index].url);
    $carouselImg.setAttribute('id', images[index].id);
  } else {
    index = images.length - 1;
    $carouselImg.setAttribute('src', images[index].url);
    $carouselImg.setAttribute('id', images[index].id);
  }
}
function getNextIndex() {
  if (index < images.length - 1) {
    index++;
    $carouselImg.setAttribute('src', images[index].url);
    $carouselImg.setAttribute('id', images[index].id);
  } else {
    index = 0;
    $carouselImg.setAttribute('src', images[0].url);
    $carouselImg.setAttribute('src', images[0].id);
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
      var imageObj = {
        url: 'https://image.tmdb.org/t/p/w500/' + xhr.response.results[i].poster_path,
        id: xhr.response.results[i].id
      };
      images.push(imageObj);
      $carouselImg.setAttribute('src', images[0].url);
      $carouselImg.setAttribute('id', images[0].id);
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
      var $div = document.createElement('div');
      var $a = document.createElement('a');
      var $categoryImg = document.createElement('img');
      $div.setAttribute('class', 'col-third pd');
      $a.setAttribute('href', '#');
      $categoryImg.setAttribute('src', 'https://image.tmdb.org/t/p/w500/' + xhr.response.results[i].poster_path);
      $categoryImg.setAttribute('class', 'border-r cursor-p');
      $categoryImg.setAttribute('id', xhr.response.results[i].id);
      $div.appendChild($a);
      $a.appendChild($categoryImg);
      DOMparent.appendChild($div);
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
      var $div = document.createElement('div');
      var $a = document.createElement('a');
      var $categoryImg = document.createElement('img');
      $div.setAttribute('class', 'col-third pd');
      $a.setAttribute('href', '#');
      $categoryImg.setAttribute('src', 'https://image.tmdb.org/t/p/w500/' + xhr.response.results[i].poster_path);
      $categoryImg.setAttribute('class', 'border-r cursor-p');
      $categoryImg.setAttribute('id', xhr.response.results[i].id);
      $div.appendChild($a);
      $a.appendChild($categoryImg);
      $trending.appendChild($div);
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
var $viewList = document.querySelectorAll('.c-view');
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
  for (var k = 0; k < $viewList.length; k++) {
    if (event.target.getAttribute('data-view') === $tabList[k].getAttribute('data-view')) {
      $viewList[k].classList.remove('hidden');
    } else {
      $viewList[k].classList.add('hidden');
    }
  }
}

// navigation bar
// var $home = document.querySelector('.home');
// var $list = document.querySelector('.list');
// var $detail = document.querySelector('.detail');
// var $views = document.querySelectorAll('.view');

// function viewSwap(string) {
//   for (var i = 0; i < $views.length; i++) {
//     if (event.target.getAttribute('data-view') === $views[i].getAttribute('data-view')) {
//       $views[i].classList.remove('hidden');
//     } else {
//       $views[i].classList.add('hidden');
//     }
//   }
// }

// if the user clicks on logo, the user is taken back to the home
// and delete the DOM details created
// hide list and details
// if the user clicks on the list, the user is taken to the list
// and create all the items stored inside the list object
// hide home and details
// if the user clicks on images, the user is taken to the details
// and create the details page with the movie ID
// hide home and list

// movie detail
window.addEventListener('click', handleImgClick);

function handleImgClick(event) {
  if (!event.target.tagName === ('IMG')) {
    return;
  }
  if (event.target.tagName === ('IMG')) {
    var $detail = document.querySelector('.detail');
    var $home = document.querySelector('.home');
    var targetId = event.target.id;
    $detail.classList.remove('hidden');
    $home.classList.add('hidden');
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
    $h2.setAttribute('class', 'margin-t0');
    var $p = document.createElement('p');
    $p.textContent = xhr.response.overview;
    $p.setAttribute('class', 'font-work');
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
    $dateP.setAttribute('class', 'font-work');
    for (var i = 0; i < xhr.response.production_companies.length; i++) {
      var $prodP = document.createElement('p');
      $prodP.textContent = xhr.response.production_companies[i].name;
      $prodP.setAttribute('class', 'font-work');
      $prod.appendChild($prodP);
    }

    for (var k = 0; k < xhr.response.genres.length; k++) {
      var $genreP = document.createElement('p');
      $genreP.textContent = xhr.response.genres[k].name;
      $genreP.setAttribute('class', 'font-work');
      $genre.appendChild($genreP);
    }
    $date.appendChild($dateP);
    $div.append($date, $prod, $genre);
    $detailInfo.appendChild($div);
  });
  xhr.send();
}
