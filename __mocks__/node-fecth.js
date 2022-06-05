const URLS_Validas = [
  "https://randomuser.me/api/portraits/women/77.jpg",
  "https://randomuser.me/api/portraits/men/71.jpg",
];

function fetch(url) {
  const isURLValida = URLS_Validas.indexOf(url) !== -1;
  return Promise.resolve(isURLValida ? { status: 200 } : { status: 400 });
}

module.exports = fetch;
