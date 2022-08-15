var $home = document.querySelector('.home');
var $nav = document.querySelector('.nav');
var $views = document.querySelectorAll('.view');
var $detail = document.querySelector('.detail');
var $tabContainer = document.querySelector('.tab-container');
var $listContainer = document.querySelector('.list-container');
var $cViewContainer = document.querySelector('.c-view-container');
var $tabList = document.querySelectorAll('.tab');
var $carousel = document.querySelector('.carousel');
var $carouselImg = document.querySelector('.carousel-image');
var intervalID = setInterval(getNextFilm, 3000);
var index = 0;
var $leftArrow = document.querySelector('.fa-chevron-left');
var $rightArrow = document.querySelector('.fa-chevron-right');
var $addButton = document.querySelector('.add-button');
$nav.addEventListener('click', handleNav);
$tabContainer.addEventListener('click', handleTabClick);
$listContainer.addEventListener('click', showDetails);
$cViewContainer.addEventListener('click', showDetails);
$carousel.addEventListener('click', showDetails);
$leftArrow.addEventListener('click', showPreviousImage);
$rightArrow.addEventListener('click', showNextImage);
$addButton.addEventListener('click', addMovie);

getCategory('nowPlaying', '', 'now_playing');
getCategory('topRated', '', 'top_rated');

function getCategory(category, string1, string2) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.themoviedb.org/3/' + string1 + 'movie/' + string2 + '?api_key=d7a558bf3c164e7e0d8761462a9973e2&language=en-US');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    data.categories[category] = xhr.response.results;
    if (category === 'nowPlaying') {
      $carouselImg.setAttribute('src', 'https://image.tmdb.org/t/p/w500/' + data.categories.nowPlaying[0].poster_path);
      $carouselImg.setAttribute('id', data.categories.nowPlaying[0].id);
    } else {
      for (var i = 0; i < data.categories[category].length; i++) {
        renderMovie(data.categories[category][i]);
        $cViewContainer.append(renderMovie(data.categories[category][i]));
      }
    }
  });
  xhr.send();
}
function getDetails(id) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.themoviedb.org/3/movie/' + id + '?api_key=d7a558bf3c164e7e0d8761462a9973e2&language=en-US');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    data.details = xhr.response;
    renderDetails(data.details);
  });
  xhr.send();
}
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
    $carouselImg.setAttribute('src', 'https://image.tmdb.org/t/p/w500/' + data.categories.nowPlaying[index].poster_path);
    $carouselImg.setAttribute('id', data.categories.nowPlaying[index].id);
  } else {
    index = data.categories.nowPlaying.length - 1;
    $carouselImg.setAttribute('src', 'https://image.tmdb.org/t/p/w500/' + data.categories.nowPlaying[index].poster_path);
    $carouselImg.setAttribute('id', data.categories.nowPlaying[index].id);
  }
}
function getNextFilm() {
  if (index < data.categories.nowPlaying.length - 1) {
    index++;
    $carouselImg.setAttribute('src', 'https://image.tmdb.org/t/p/w500/' + data.categories.nowPlaying[index].poster_path);
    $carouselImg.setAttribute('id', data.categories.nowPlaying[index].id);
  } else {
    index = 0;
    $carouselImg.setAttribute('src', 'https://image.tmdb.org/t/p/w500/' + data.categories.nowPlaying[0].poster_path);
    $carouselImg.setAttribute('id', data.categories.nowPlaying[0].id);
  }
}
function setInt() {
  clearInterval(intervalID);
  intervalID = setInterval(getNextFilm, 3000);
}
function renderMovie(movie) {
/*
<div class= "col-fourth pd">
  <a href= "#" class= "pd-0">
    <img src= "" class= "border-r" id= "">
  </a>
</div>
*/
  var $colFourth = document.createElement('div');
  var $a = document.createElement('a');
  var $categoryImg = document.createElement('img');
  $colFourth.setAttribute('class', 'col-fourth pd');
  $a.setAttribute('href', '#');
  $a.setAttribute('class', 'pd-0');
  $categoryImg.setAttribute('src', 'https://image.tmdb.org/t/p/w500/' + movie.poster_path);
  $categoryImg.setAttribute('class', 'border-r');
  $categoryImg.setAttribute('id', movie.id);
  $a.appendChild($categoryImg);
  $colFourth.appendChild($a);
  return $colFourth;
}
function renderDetails(details) {
  var $img = document.querySelector('.detail-poster > img');
  $img.setAttribute('src', 'https://image.tmdb.org/t/p/w500/' + details.poster_path);
  var $h2 = document.querySelector('.title');
  $h2.textContent = details.title;
  var $rating = document.querySelector('.rating');
  $rating.textContent = details.vote_average.toFixed(1);
  var $overview = document.querySelector('.overview');
  $overview.textContent = details.overview;
  var $date = document.querySelector('p.date');
  $date.textContent = details.release_date;
  var $prod = document.querySelector('p.prod');
  var $prodText = details.production_companies[0].name;
  for (var i = 1; i < details.production_companies.length; i++) {
    $prodText += ', ' + details.production_companies[i].name;
  }
  $prod.textContent = $prodText;
  var $genre = document.querySelector('p.genres');
  var $text = details.genres[0].name;
  for (var k = 1; k < details.genres.length; k++) {
    $text += ', ' + details.genres[k].name;
  }
  $genre.textContent = $text;
}
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
  var targetData = event.target.getAttribute('data-view');
  if (targetData === 'topRated') {
    while ($cViewContainer.firstChild) {
      $cViewContainer.removeChild($cViewContainer.firstChild);
    }
    getCategory(targetData, '', 'top_rated');
  } else if (targetData === 'trending') {
    while ($cViewContainer.firstChild) {
      $cViewContainer.removeChild($cViewContainer.firstChild);
    }
    getCategory(targetData, 'trending/', 'week');
  } else if (targetData === 'popular') {
    while ($cViewContainer.firstChild) {
      $cViewContainer.removeChild($cViewContainer.firstChild);
    }
    getCategory(targetData, '', 'popular');
  } else if (targetData === 'upcoming') {
    while ($cViewContainer.firstChild) {
      $cViewContainer.removeChild($cViewContainer.firstChild);
    }
    getCategory(targetData, '', 'upcoming');
  }
}
function viewSwap(string) {
  for (var i = 0; i < $views.length; i++) {
    if ($views[i].getAttribute('data-view') === string) {
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
      var $MyList = renderMovie(data.watchlist[i]);
      $listContainer.appendChild($MyList);
    }
  }
  viewSwap(event.target.getAttribute('data-view'));
}
function addMovie(event) {
  addButton();
}
function addButton() {
  var found = false;
  for (var i = 0; i < data.watchlist.length; i++) {
    if (data.details.id === data.watchlist[i].id) {
      found = true;
    } else {
      found = false;
    }
  }
  if ((event.target.textContent === 'Add to My List') && (found === false)) {
    data.watchlist.push(data.details);
    event.target.textContent = 'Remove';
  } else if (event.target.textContent === 'Remove') {
    event.target.textContent = 'Add to My List';
    data.watchlist.pop();
  }
}

// when the user clicks the add button the text turns to remove
// when the user clicks the remove button the text turns to add
// if the user clicks the add button the movie is added to the watchlist
// if the user cliks the remove button the movie is deleted from the watchlist
// if the movie is already in the watchlist, the user sees a remove button
// if the movie is not in the watchlist, the user sees an add button

function showDetails(event) {
  if (!event.target.tagName === ('IMG')) {
    return;
  }
  if (event.target.tagName === ('IMG')) {
    var targetId = event.target.id;
    getDetails(targetId);
    $detail.classList.remove('hidden');
    $home.classList.add('hidden');
    $listContainer.classList.add('hidden');
  }
}
