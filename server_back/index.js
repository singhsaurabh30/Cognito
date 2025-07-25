import express from "express"
import { PORT } from "./config/serverConfig.js";
import { connect } from "./config/database.js";
import router from "./routes/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
const __dirname=path.resolve();

const app=express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));



connect();
app.use('/api',router);
app.use(express.static(path.join(__dirname,"/client_ui/dist")));
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,"client_ui","dist","index.html"));
})
const port=PORT||3000;
app.listen(port,()=>{
    console.log(`server started at port  ${PORT}`);
})

