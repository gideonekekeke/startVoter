import mongoose from "mongoose";

const url: string = "mongodb://localhost/voters";

mongoose.connect(url, () => {
  console.log("database is now connected...!");
});

export default mongoose;
