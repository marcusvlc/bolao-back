import startDB from "../database/index";

class Loader {
  start() {
    startDB();
  }
}

export default new Loader();
