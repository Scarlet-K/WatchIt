var images = [];
var $carouselImg = document.querySelector('.carousel-image');
var intervalID = setInterval(getNextFilm, 3000);
var index = 0;
var $leftArrow = document.querySelector('.fa-chevron-left');
var $rightArrow = document.querySelector('.fa-chevron-right');
$leftArrow.addEventListener('click', showPreviousImage);
$rightArrow.addEventListener('click', showNextImage);

function showPreviousImage(event) {
  getPreviousFilm();
  setInt();
}
function showNextImage(event) {
  getNextFilm();
  setInt();
}
function getPreviousFilm() {
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
function getNextFilm() {
  if (index < images.length - 1) {
    index++;
    $carouselImg.setAttribute('src', images[index].url);
    $carouselImg.setAttribute('id', images[index].id);
  } else {
    index = 0;
    $carouselImg.setAttribute('src', images[0].url);
    $carouselImg.setAttribute('id', images[0].id);
  }
}
function setInt() {
  clearInterval(intervalID);
  intervalID = setInterval(getNextFilm, 3000);
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

var $topRated = document.querySelector('.top-rated');
var $trending = document.querySelector('.trending');
var $popular = document.querySelector('.popular');
var $upcoming = document.querySelector('.upcoming');
var $tabContainer = document.querySelector('.tab-container');
var $tabList = document.querySelectorAll('.tab');
var $cViews = document.querySelectorAll('.c-view');
$tabContainer.addEventListener('click', handleTabClick);

function getCategory(string1, string2, DOMparent) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.themoviedb.org/3/' + string1 + 'movie/' + string2 + '?api_key=d7a558bf3c164e7e0d8761462a9973e2&language=en-US');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
  /*
    <div class= "col-fourth pd">
      <a href= "#" class= "pd-0">
        <img src= "" class= "border-r" id= "">
      </a>
    </div>
  */
    for (var i = 0; i < xhr.response.results.length; i++) {
      var $div = document.createElement('div');
      var $a = document.createElement('a');
      var $categoryImg = document.createElement('img');
      $div.setAttribute('class', 'col-fourth pd');
      $a.setAttribute('href', '#');
      $a.setAttribute('class', 'pd-0');
      $categoryImg.setAttribute('src', 'https://image.tmdb.org/t/p/w500/' + xhr.response.results[i].poster_path);
      $categoryImg.setAttribute('class', 'border-r');
      $categoryImg.setAttribute('id', xhr.response.results[i].id);
      $a.appendChild($categoryImg);
      $div.appendChild($a);
      DOMparent.appendChild($div);
    }
  });
  xhr.send();
}
getCategory('', 'top_rated', $topRated);

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
  if (event.target.getAttribute('data-view') === 'top-rated') {
    while ($topRated.firstChild) {
      $topRated.removeChild($topRated.firstChild);
    }
    getCategory('', 'top_rated', $topRated);
    categorySwap('top-rated');
  } else if ((event.target.getAttribute('data-view') === 'trending')) {
    while ($trending.firstChild) {
      $trending.removeChild($trending.firstChild);
    }
    getCategory('trending/', 'week', $trending);
    categorySwap('trending');
  } else if ((event.target.getAttribute('data-view') === 'popular')) {
    while ($popular.firstChild) {
      $popular.removeChild($popular.firstChild);
    }
    getCategory('', 'popular', $popular);
    categorySwap('popular');
  } else if ((event.target.getAttribute('data-view') === 'upcoming')) {
    while ($upcoming.firstChild) {
      $upcoming.removeChild($upcoming.firstChild);
    }
    getCategory('', 'upcoming', $upcoming);
    categorySwap('upcoming');
  }
}

function categorySwap(string) {
  for (var c = 0; c < $cViews.length; c++) {
    if (event.target.getAttribute('data-view') === $cViews[c].getAttribute('data-view')) {
      $cViews[c].classList.remove('hidden');
    } else {
      $cViews[c].classList.add('hidden');
    }
  }
}

var $home = document.querySelector('.home');
// var $list = document.querySelector('.list');
var $nav = document.querySelector('.nav');
var $views = document.querySelectorAll('.view');
var $detail = document.querySelector('.detail');
var $carousel = document.querySelector('.carousel');
var $cViewContainer = document.querySelector('.c-view-container');
$carousel.addEventListener('click', showDetails);
$cViewContainer.addEventListener('click', showDetails);
$nav.addEventListener('click', handleNav);

function handleNav(event) {
  viewSwap(event.target.getAttribute('data-view'));
}

function viewSwap(string) {
  for (var i = 0; i < $views.length; i++) {
    if (event.target.getAttribute('data-view') === $views[i].getAttribute('data-view')) {
      $views[i].classList.remove('hidden');
    } else {
      $views[i].classList.add('hidden');
    }
  }
}

function showDetails(event) {
  if (!event.target.tagName === ('IMG')) {
    return;
  }
  if (event.target.tagName === ('IMG')) {
    var $detail = document.querySelector('.detail');
    var targetId = event.target.id;
    while ($detail.firstChild) {
      $detail.removeChild($detail.firstChild);
    }
    getDetails(targetId);
    $detail.classList.remove('hidden');
    $home.classList.add('hidden');
  }
}

function getDetails(id) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.themoviedb.org/3/movie/' + id + '?api_key=d7a558bf3c164e7e0d8761462a9973e2&language=en-US');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
  /*
    <div class="row pd-tb3">
      <div class="col-half">
        <div class="row">
          <div class="col-full pd-lr detail-poster">
            <img>
          </div>
        </div>
      </div>
      <div class="col-half pd-lr font-ver detail-info">
        <h2></h2>
        <p class= "font-work grey-font"></p>
        <div class= "pd-tb">
          <h4></h4>
          <p class= "font-work font-s grey-font"></p>
          <h4></h4>
          <span class= "font-work font-s grey-font"></span>
          <h4></h4>
          <span class= "font-work font-s grey-font"></span>
        </div>
      </div>
    </div>
  */
    var $row = document.createElement('div');
    $row.setAttribute('class', 'row pd-tb3');
    var $colHalf = document.createElement('div');
    $colHalf.setAttribute('class', 'col-half');
    var $posterRow = document.createElement('div');
    $posterRow.setAttribute('class', 'row');
    var $detailPoster = document.createElement('div');
    $detailPoster.setAttribute('class', 'col-full pd-lr detail-poster');
    var $img = document.createElement('img');
    $img.setAttribute('src', 'https://image.tmdb.org/t/p/w500/' + xhr.response.poster_path);
    var $detailInfo = document.createElement('div');
    $detailInfo.setAttribute('class', 'col-half pd-lr font-ver detail-info');
    var $h2 = document.createElement('h2');
    $h2.textContent = xhr.response.title;
    var $p = document.createElement('p');
    $p.textContent = xhr.response.overview;
    $p.setAttribute('class', 'font-work grey-font');
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
    $dateP.setAttribute('class', 'font-work font-s grey-font');
    $div.append($date, $prod, $genre);
    for (var i = 0; i < xhr.response.production_companies.length; i++) {
      var $prodP = document.createElement('p');
      $prodP.textContent = xhr.response.production_companies[i].name;
      $prodP.setAttribute('class', 'font-work font-s grey-font');
      $prod.after($prodP);
    }

    for (var k = 0; k < xhr.response.genres.length; k++) {
      var $genreP = document.createElement('p');
      $genreP.textContent = xhr.response.genres[k].name;
      $genreP.setAttribute('class', 'font-work font-s grey-font');
      $genre.after($genreP);
    }
    $row.appendChild($colHalf);
    $colHalf.appendChild($posterRow);
    $posterRow.appendChild($detailPoster);
    $detailPoster.appendChild($img);
    $row.appendChild($detailInfo);
    $detailInfo.append($h2, $p);
    $detailInfo.appendChild($div);
    $date.after($dateP);
    $detail.appendChild($row);
  });
  xhr.send();
}
