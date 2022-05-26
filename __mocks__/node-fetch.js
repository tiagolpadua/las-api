const URL_VALIDAS = ["https://randomuser.me/api/portraits/men/71.jpg"];

function fetch(url) {
    const isUrlValida = URL_VALIDAS.indexOf(url) !== -1;
    return Promise.resolve(isUrlValida ? { status: 200 } : { status: 404 });
}

module.exports = fetch;