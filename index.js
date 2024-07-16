const tracer = require("dd-trace").init();
const http = require("http"); // Loads the http module

const server = http.createServer((request, response) => {
  response.writeHead(200, {
    "Content-Type": "text/plain",
  });

  console.log("Hello, World!");
  response.write("Hello, World!\n");

  response.end();
});

console.log("starting server");
server.listen(1337);
