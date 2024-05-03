import * as dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import taskRoutes from "./routes/taskRoutes";
dotenv.config();

const app = express();
const PORT = process.env.PORT ;

app.use(express.json());
app.use('/tasks', taskRoutes);

const mongoURI = process.env.MONGODB;

if (!mongoURI) {
    throw new Error('MONGODB environment variable is not defined.');
}

mongoose.connect(mongoURI).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})