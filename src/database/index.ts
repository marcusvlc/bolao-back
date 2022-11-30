import mongoose from "mongoose";

async function startDB() {
  const mongoURL = process.env.MONGO_DB_CONNECT_URL;
  if (!mongoURL) {
    console.log(mongoURL);
    return;
  }
  await mongoose
    .connect(mongoURL)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch(() => {
      console.log("Error connecting to DB");
    });
}

export default startDB;
