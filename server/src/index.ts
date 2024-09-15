import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoconnect from './db/db';
import Userroutes from "./routes/User.routes";

mongoconnect();

const PORT = 8000;
const app = express();

app.use(express.json());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use("/api/users", Userroutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
