const URLS_VALIDAS = [
  "https://avatars.githubusercontent.com/u/32554572",
  "https://randomuser.me/api/portraits/men/23.jpg",
  "https://randomuser.me/api/portraits/men/22.jpg",
  "https://randomuser.me/api/portraits/women/22.jpg",
  "https://avatars.githubusercontent.com/u/32554572",
];

function fetch(url) {
  const isURLValida = URLS_VALIDAS.indexOf(url) !== -1;

  return Promise.resolve(isURLValida ? { status: 200 } : { status: 404 });
}

module.exports = fetch;
