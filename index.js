const tracer = require("dd-trace").init({
  logInjection: true,
});
const http = require("http"); // Loads the http module
const pino = require("pino");
const logger = require("pino-http")({
  logger: pino(),
});

const server = http.createServer((request, response) => {
  response.writeHead(200, {
    "Content-Type": "text/plain",
  });

  logger(request, response);
  response.write("Hello, World!\n");
  response.end();
});

pino().info("starting server");
server.listen(1337);
