const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// we'll just use some variables as the "database" to get started
const routes = require("./routes");

function server() {
  const app = express();
  const port = process.env.PORT || 5000;

  app.use(morgan("dev"));
  app.use(cors());
  app.use(routes);

  app.start = app.listen.bind(app, port, () =>
    console.log(`Listening on port ${port}`)
  );

  return app;
}

if (require.main === module) server().start();

module.exports = server;
