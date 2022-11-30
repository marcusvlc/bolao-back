import startDB from "../database/index";

class Loader {
  initDB() {
    startDB();
  }

  initEnv() {
    require("dotenv").config();
  }

  start() {
    this.initEnv();
    this.initDB();
  }
}

export default new Loader();
