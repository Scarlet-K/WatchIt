/* exported data */

var data = {
  view: 'home',
  details: null,
  categories: {
    nowPlaying: [],
    topRated: [],
    trending: [],
    popular: [],
    upcoming: []
  },
  watchlist: []
};

var previousFilm = localStorage.getItem('watchit-local-storage');
if (previousFilm !== null) {
  data = JSON.parse(previousFilm);
}

window.addEventListener('beforeunload', handleBeforeUnload);

function handleBeforeUnload(event) {
  var serializedData = JSON.stringify(data);
  localStorage.setItem('watchit-local-storage', serializedData);
}
