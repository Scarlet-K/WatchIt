/* exported data */

var data = {
  view: 'home',
  watchlist: [],
  details: {},
  rating: 0,
  editing: null,
  nextFilmId: 1
};

// var previousFilm = localStorage.getItem('watchit-local-storage');
// if (previousFilm !== null) {
//   data = JSON.parse(previousFilm);
// }

// window.addEventListener('beforeunload', handleBeforeUnload);

// function handleBeforeUnload(event) {
//   var serializedData = JSON.stringify(data);
//   localStorage.setItem('watchit-local-storage', serializedData);
//   data.editing = null;
// }
