const URLS_VALIDAS = ["https://randouser.me/api/portraits/women/77.jpg"];

function fetch(url) {
  const isUrlValida = URLS_VALIDAS.indexOf(url) !== -1;
  return Promise.resolve(isUrlValida ? { status: 200 } : { status: 400 });
}

module.exports = fetch;
