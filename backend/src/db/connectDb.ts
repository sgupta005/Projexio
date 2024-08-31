import mongoose from 'mongoose';

async function connectDb() {
  try {
    const conn = await mongoose.connect(
      `${process.env.MONGODB_URI as string}/${process.env.DB_NAME as string}`
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    if (err instanceof Error) {
      console.log('MongoDB connection failed! ', err.message);
      process.exit(1);
    } else {
      console.log(err);
    }
  }
}
export default connectDb;
