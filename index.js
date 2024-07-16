var tracer = require("dd-trace").init({
    logInjection: true,
});
var http = require("http"); // Loads the http module
var pino = require("pino");
var logger = require("pino-http")({
    logger: pino(),
});
var server = http.createServer(function (request, response) {
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
            var err = new Error("Error!!!");
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
