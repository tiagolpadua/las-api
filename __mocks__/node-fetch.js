const URLS_VALIDAS=["https://randomuser.me/api/portraits/men/50.jpg"];

function fetch(url) {
    const isURLValida = URLS_VALIDAS.indexOf(url) !== -1;
    return Promise.resolve(isURLValida ? { status: 200 } : { status: 400 });
  }
  
  module.exports = fetch;