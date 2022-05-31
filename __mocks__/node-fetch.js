const URLS_VALIDAS = [
  "https://randomuser.me/api/portraits/women/3.jpg",
  "https://randomuser.me/api/portraits/men/30.jpg",
  "https://randomuser.me/api/portraits/men/65.jpg"
];

function fetch(url) {

  const isURLValida = URLS_VALIDAS.indexOf(url) !== -1;

  return Promise.resolve(isURLValida ? { status: 200} : { status: 404});
}

module.exports = fetch;