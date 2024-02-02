import dotenv from "dotenv";
import mongoose from "mongoose";
import color from "colors";
dotenv.config();
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.dbURI_LOCAL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected : ${conn.connection.host}`.yellow.underline);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
