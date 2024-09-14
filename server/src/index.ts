import express, {Request,Response} from "express"
import cors from "cors"

const PORT = 8000;
const app = express();

app.use(express.json());
app.use(cors());

app.get('/',(req:Request,res:Response) => {
    res.send("hello world");
})


app.listen(PORT,() => {
    console.log(`server is running on port 8000`);
    
})
