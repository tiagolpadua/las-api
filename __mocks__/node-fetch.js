const URL_VALIDAS = ["https://randomuser.me/api/portraits/men/44.jpg"];

function fetch(url) {
  const urlEhValida = URL_VALIDAS.indexOf(url) !== -1;
  return Promise.resolve(urlEhValida ? { status: 200 } : { status: 400 });
}

module.exports = fetch;
