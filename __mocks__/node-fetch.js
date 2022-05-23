const URLS_VALIDAS = [
  "https://randomuser.me/api/portraits/men/16.jpg",
  "https://randomuser.me/api/portraits/women/36.jpg",
];

function fetch(url) {
  const isURLValida = URLS_VALIDAS.indexOf(url) !== -1;
  return Promise.resolve(isURLValida ? { status: 200 } : { status: 404 });
}

module.exports = fetch;
