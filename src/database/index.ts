import mongoose from "mongoose";

async function startDB() {
  await mongoose
    .connect(
      "mongodb+srv://tpvplays:123456aa@cluster0.yjyhn8w.mongodb.net/test"
    )
    .then(() => {
      console.log("Connected to DB");
    })
    .catch(() => {
      console.log("Error connecting to DB");
    });
}

export default startDB;
