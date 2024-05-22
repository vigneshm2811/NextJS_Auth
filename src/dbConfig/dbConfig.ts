import mongoose, { connection } from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connect", () => {
      console.log("MongoDB Connected Successfully");
    });
    connection.on("error", (err) => {
      console.log("MongoDB connection error, please check the connection", err);
      process.exit;
    });
  } catch (error) {
    console.log("something went wrong!");
    console.log(error);
  }
}
