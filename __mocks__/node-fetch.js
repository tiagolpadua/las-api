const URLS_VALIDAS = [
    "https://randomuser.me/api/portraits/women/55.jpg"
];
function fetch (url) {
    const isURLvalid = URLS_VALIDAS.indexOf(url) !== -1;
    return Promise.resolve(isURLvalid ? {status: 200} : {status: 404});
}

module.exports = fetch;