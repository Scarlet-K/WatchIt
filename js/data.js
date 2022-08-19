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

var previousData = localStorage.getItem('watchit-local-storage');
if (previousData !== null) {
  data = JSON.parse(previousData);
}

window.addEventListener('beforeunload', handleBeforeUnload);

function handleBeforeUnload(event) {
  var serializedData = JSON.stringify(data);
  localStorage.setItem('watchit-local-storage', serializedData);
}
