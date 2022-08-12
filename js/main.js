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
var $cViewContainer = document.querySelector('.c-view-container');
var $tabList = document.querySelectorAll('.tab');
var $cViews = document.querySelectorAll('.c-view');
$tabContainer.addEventListener('click', handleTabClick);

function getCategory(string1, string2, DOMparent) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.themoviedb.org/3/' + string1 + 'movie/' + string2 + '?api_key=d7a558bf3c164e7e0d8761462a9973e2&language=en-US');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    $cViewContainer.appendChild(renderCategory(xhr.response.results, DOMparent));
  });
  xhr.send();
}

function renderCategory(response, DOMparent) {
/*
<div class= "c-view">
  <div class= "col-fourth pd">
    <a href= "#" class= "pd-0">
      <img src= "" class= "border-r" id= "">
    </a>
  </div>
</div>
*/
  for (var i = 0; i < response.length; i++) {
    var $div = document.createElement('div');
    var $a = document.createElement('a');
    var $categoryImg = document.createElement('img');
    $div.setAttribute('class', 'col-fourth pd');
    $a.setAttribute('href', '#');
    $a.setAttribute('class', 'pd-0');
    $categoryImg.setAttribute('src', 'https://image.tmdb.org/t/p/w500/' + response[i].poster_path);
    $categoryImg.setAttribute('class', 'border-r');
    $categoryImg.setAttribute('id', response[i].id);
    $a.appendChild($categoryImg);
    $div.appendChild($a);
    DOMparent.appendChild($div);
  }
  return DOMparent;
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
var $nav = document.querySelector('.nav');
var $views = document.querySelectorAll('.view');
var $detail = document.querySelector('.detail');
var $carousel = document.querySelector('.carousel');
var $listContainer = document.querySelector('.list-container');
$listContainer.addEventListener('click', showDetails);
$carousel.addEventListener('click', showDetails);
$cViewContainer.addEventListener('click', showDetails);
$nav.addEventListener('click', handleNav);

function viewSwap(string) {
  for (var i = 0; i < $views.length; i++) {
    if (event.target.getAttribute('data-view') === $views[i].getAttribute('data-view')) {
      $views[i].classList.remove('hidden');
    } else {
      $views[i].classList.add('hidden');
    }
  }
  data.view = string;
}

function handleNav(event) {
  if (event.target.getAttribute('data-view') === 'list') {
    while ($listContainer.firstChild) {
      $listContainer.removeChild($listContainer.firstChild);
    }
    for (var i = 0; i < data.watchlist.length; i++) {
      var $MyList = renderMyList(data.watchlist[i]);
      $listContainer.appendChild($MyList);
    }
  }
  viewSwap(event.target.getAttribute('data-view'));
}

function addMovie(event) {
  if (event.target.tagName === 'BUTTON') {
    for (var i = 0; i < data.movies.length; i++) {
      if (Number.parseInt(event.target.id) === data.movies[i].id) {
        data.watchlist.unshift(data.movies[i]);
      }
    }
  }
}

function renderMyList(watchlist) {
  /*
  <div class= "col-fourth pd">
    <a href= "#" class= "pd-0">
      <img src= "" class= "border-r" id= "">
    </a>
  </div>
  */
  var $div = document.createElement('div');
  var $a = document.createElement('a');
  var $categoryImg = document.createElement('img');
  $div.setAttribute('class', 'col-fourth pd');
  $a.setAttribute('href', '#');
  $a.setAttribute('class', 'pd-0');
  $categoryImg.setAttribute('src', 'https://image.tmdb.org/t/p/w500/' + watchlist.poster_path);
  $categoryImg.setAttribute('class', 'border-r');
  $categoryImg.setAttribute('id', watchlist.id);
  $a.appendChild($categoryImg);
  $div.appendChild($a);
  return $div;
}

function showDetails(event) {
  if (!event.target.tagName === ('IMG')) {
    return;
  }
  if (event.target.tagName === ('IMG')) {
    var targetId = event.target.id;
    while ($detail.firstChild) {
      $detail.removeChild($detail.firstChild);
    }
    getDetails(targetId);
    $detail.classList.remove('hidden');
    $home.classList.add('hidden');
    $listContainer.classList.add('hidden');
  }
}

function getDetails(id) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.themoviedb.org/3/movie/' + id + '?api_key=d7a558bf3c164e7e0d8761462a9973e2&language=en-US');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    renderDetails(xhr.response);
    var currentMovie = {
      id: xhr.response.id,
      poster_path: 'https://image.tmdb.org/t/p/w500/' + xhr.response.poster_path
    };
    data.movies.push(currentMovie);
  });
  xhr.send();
}

function renderDetails(response) {
/*
<div class= "row pd-tb3">
  <div class= "col-half">
    <div class= "row">
      <div class= "col-full pd-lr detail-poster">
        <img>
      </div>
      <div class= "row text-end pd-tb1">
        <div class= "col-full pd-lr">
          <button class= "add-button">Add to My List</button>
        </div>
      </div>
    </div>
  </div>
  <div class= "col-half pd-lr font-ver detail-info">
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
  $img.setAttribute('src', 'https://image.tmdb.org/t/p/w500/' + response.poster_path);
  var $rowButton = document.createElement('div');
  $rowButton.setAttribute('class', 'row text-end pd-tb1');
  var $colFull = document.createElement('div');
  $colFull.setAttribute('class', 'col-full pd-lr');
  var $button = document.createElement('button');
  $button.setAttribute('class', 'add-button');
  $button.setAttribute('id', response.id);
  $button.textContent = 'Add to My List';
  $button.addEventListener('click', addMovie);
  var $detailInfo = document.createElement('div');
  $detailInfo.setAttribute('class', 'col-half pd-lr font-ver detail-info');
  var $h2 = document.createElement('h2');
  $h2.textContent = response.title;
  var $star = document.createElement('i');
  $star.setAttribute('class', 'fa-solid fa-star yellow');
  var $rating = document.createElement('span');
  $rating.setAttribute('class', 'pd-lr-h');
  $rating.textContent = response.vote_average.toFixed(1);
  var $p = document.createElement('p');
  $p.textContent = response.overview;
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
  $dateP.textContent = response.release_date;
  $dateP.setAttribute('class', 'font-work font-s grey-font');
  $div.append($date, $prod, $genre);
  for (var i = 0; i < response.production_companies.length; i++) {
    var $prodP = document.createElement('p');
    $prodP.textContent = response.production_companies[i].name;
    $prodP.setAttribute('class', 'font-work font-s grey-font');
    $prod.after($prodP);
  }
  for (var k = 0; k < response.genres.length; k++) {
    var $genreP = document.createElement('p');
    $genreP.textContent = response.genres[k].name;
    $genreP.setAttribute('class', 'font-work font-s grey-font');
    $genre.after($genreP);
  }
  $row.appendChild($colHalf);
  $colHalf.appendChild($posterRow);
  $posterRow.appendChild($detailPoster);
  $detailPoster.appendChild($img);
  $colHalf.appendChild($rowButton);
  $colFull.append($button);
  $rowButton.appendChild($colFull);
  $row.appendChild($detailInfo);
  $detailInfo.append($h2, $star, $rating, $p);
  $detailInfo.appendChild($div);
  $date.after($dateP);
  $detail.appendChild($row);
}
