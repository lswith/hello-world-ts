const tracer = require("dd-trace").init({
  logInjection: true,
});
const http = require("http"); // Loads the http module
const pino = require("pino");
const logger = require("pino-http")({
  logger: pino(),
});

const server = http.createServer((request: any, response: any) => {
  logger(request, response);
  switch (request.url) {
    case "/hello":
      response.writeHead(200, {
        "Content-Type": "text/plain",
      });

      response.write("Hello, World!\n");
      response.end();
      break;

    case "/error":
      let err = new Error("Error!!!");
      request.log.error(err);
      response.writeHead(500);
      response.end();
      break;

    default:
      response.writeHead(404);
      response.end();
  }
});

pino().info("starting server");
server.listen(1337);

// graphql
// express
// handle errors (using sentry sdk)
// pino logs
//
