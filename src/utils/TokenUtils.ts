const jwt = require("jsonwebtoken");

const DAY_IN_SECONDS = 60 * 60 * 24;

export default {
  generateToken({ username }: { username: string }) {
    return jwt.sign({ username }, process.env.TOKEN_SECRET, {
      expiresIn: DAY_IN_SECONDS,
    });
  },
};
