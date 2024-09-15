import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.MONGO_URL;

if (!mongoUri) {
  console.error('MONGO_URL is not defined');
  process.exit(1); // Exit process if the environment variable is missing
}

const mongoconnect = async (): Promise<void> => {
  try {
    await mongoose.connect(mongoUri);
    console.log('Database connected');
  } catch (error) {
    console.error(`Error connecting to the database: ${error}`);
    process.exit(1); // Exit process if unable to connect
  }
};

export default mongoconnect;
