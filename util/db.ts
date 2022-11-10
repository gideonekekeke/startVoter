import mongoose from "mongoose";

const url: string = "mongodb://localhost/votersDB";
const urlOnline: string =
  "mongodb+srv://OneChurch:<OneChurch@cluster0.q3zol.mongodb.net/youthCouncil?retryWrites=true&w=majority";

mongoose.connect(url, () => {
  console.log("database is now connected...!");
});

export default mongoose;
