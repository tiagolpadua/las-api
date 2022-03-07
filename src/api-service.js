const fetch = require("node-fetch");
const HOST = "https://stupefied-keller-a2c79e.netlify.app/";

const GET = async function (path) {
  const res = await fetch(`${HOST}${path}.json`);
  if (res.status !== 200) {
    throw new Error(`${res.statusText}: ${res.status}`);
  }
  return await res.json();
};

// GET("produtos").then((data) => console.log(data));
// GET("categorias").then((data) => console.log(data));
// GET("cupos").then((data) => console.log(data));

module.exports = { GET };
