import mongoose  from "mongoose";

function connectToDb() {
  mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Db Connect Successfulle ");
   
  })
  .catch((err) => {
    console.log(err);
  })
}

export default connectToDb;