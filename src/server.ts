import express from "express";
import router from "./route";
import loaders from "./loaders";

const cors = require("cors");

// Iniciando aplicacao
const app = express();

loaders.start();

// Using
app.use(cors());
app.use(express.json());
app.use(router);
app.listen(process.env.PORT || 3333, () => {
  console.log("Running Server");
});

module.exports = app;
