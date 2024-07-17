import express from "express";
import { buildSchema } from "graphql";
import { createHandler } from "graphql-http/lib/use/express";
import type { ErrorRequestHandler, RequestHandler } from "express";
import { ruruHTML } from "ruru/server";
import pino from "pino";
import pinoHttp from "pino-http";

const logger = pino({
  name: "http",
  transport: {
    targets: [
      {
        target: "pino-pretty",
        options: {
          colorize: true,
        },
      },
      {
        target: "pino/file",
        options: {
          destination: "./logs/app.log",
        },
      },
    ],
  },
});

const tracer = require("dd-trace").init({
  logInjection: true,
});

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello() {
    return "Hello world!";
  },
};

var app = express();

app.use(pinoHttp({ logger }));

// Create and use the GraphQL handler.
app.all(
  "/graphql",
  createHandler({
    schema: schema,
    rootValue: root,
  })
);

app.get("/graphiql", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

app.get("/", (_, res) => {
  res.send("Home");
});

app.get("/hello", (_, res) => {
  res.send("Hello World!");
});

app.get("/error", () => {
  throw new Error("Error!!!");
});

const ErrorMiddleware: ErrorRequestHandler = (error, _req, res, _next) => {
  console.log("here");
  logger.error(error);
  res.status(500).send(`error`);
};

app.use(ErrorMiddleware);

const RouteNotFoundMiddleware: RequestHandler = (_req, res, _next) => {
  console.log("there");
  res.status(404);
  // End the request with no data
  res.end();
};

app.use(RouteNotFoundMiddleware);

app.listen(1337);

pino().info("starting server at http://localhost:1337");
