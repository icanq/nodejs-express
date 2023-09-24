const express = require('express');
const app = express();
const PORT = 3000;

/**
 * const server = http.createServer((req, res) => {
 * 
 *   if (req.url === "/" && req.method === "GET") {
 *    res.writeHead(200, { "Content-Type": "text/html" });
 *    res.write("<h1>Home Page</h1>");
 *    res.end();
 *   }
 * 
 * });
 * 
*/

app.get("/", (req, res) => {
  res.set("Content-Type", "text/html");
  // untuk mengecek apakah content-type sudah di set atau belum pada header
  console.log(res.get("Content-Type"));
  res.send("<h1>Home Page</h1>");
})

/**
 * server.listen(PORT, () => {
 *  console.log(`Server is running on port ${PORT}`);
 * }
 */

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});