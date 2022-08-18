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
$addButton.addEventListener('click', handleAdd);

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
    fillDetails(data.details);
  });
  xhr.send();
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

function fillDetails(details) {
  for (var b = 0; b < data.watchlist.length; b++) {
    if (details.id === data.watchlist[b].id) {
      $addButton.textContent = 'Remove';
    } else {
      $addButton.textContent = 'Add to My List';
    }
  }
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

function renderWatchlist(watchlist) {
  /*
<div class= "col-sixth pd">
  <a href= "#" class= "pd-0">
    <img src= "" class= "border-r" id= "">
  </a>
  <div class= "row justify-end pd-lr">
    <button>Remove</button>
  </div>
</div>
*/
  var $colFourth = document.createElement('div');
  var $a = document.createElement('a');
  var $categoryImg = document.createElement('img');
  // var $removeButton = document.createElement('button');
  $colFourth.setAttribute('class', 'col-sixth pd');
  $a.setAttribute('href', '#');
  $a.setAttribute('class', 'pd-0');
  $categoryImg.setAttribute('src', 'https://image.tmdb.org/t/p/w500/' + watchlist.poster_path);
  $categoryImg.setAttribute('class', 'border-r');
  $categoryImg.setAttribute('id', watchlist.id);
  // $removeButton.textContent = 'Remove';
  // $removeButton.addEventListener('click', handleRemove);
  $a.appendChild($categoryImg);
  $colFourth.appendChild($a);
  // $colFourth.appendChild($removeButton);
  return $colFourth;
}

// function handleRemove(event) {
//   for (var i = 0; i < data.watchlist.length; i++) {
//     if ((event.target.textContent === 'Remove') && (data.details.id === data.watchlist[i].id)) {
//       data.watchlist.splice(i, 1);
//     }
//   }
// }

// this remove button is on the watchlist page
// when the user clicks it, the detail object is deleted from the watchlist array
// and deleted from the DOM tree

function handleAdd(event) {
  if (event.target.textContent === 'Add to My List') {
    data.watchlist.push(data.details);
    event.target.textContent = 'Remove';
  } else {
    for (var i = 0; i < data.watchlist.length; i++) {
      if ((event.target.textContent === 'Remove') && (data.details.id === data.watchlist[i].id)) {
        data.watchlist.splice(i, 1);
        event.target.textContent = 'Add to My List';
      }
    }
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
      var $MyList = renderWatchlist(data.watchlist[i]);
      $listContainer.appendChild($MyList);
    }
  }
  viewSwap(event.target.getAttribute('data-view'));
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

function showDetails(event) {
  if (!event.target.tagName === ('IMG')) {
    return;
  }
  var targetId = event.target.id;
  getDetails(targetId);
  $detail.classList.remove('hidden');
  $home.classList.add('hidden');
  $listContainer.classList.add('hidden');
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
