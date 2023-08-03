import mongoose from "mongoose";

const dbconection = async (DATABASE_URL) => {
  try {
    const data = await mongoose.connect(DATABASE_URL);
     if(data){
      console.log('database Connection')
     }
      
  } catch (error) {
    console.log("Database connention error.");
  }
};

export default dbconection;
