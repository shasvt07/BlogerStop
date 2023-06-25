
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
import userRouter from "./routes/user.js";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const app = require("express")();
mongoose.set("strictQuery", false);

// const app = express();
dotenv.config();

const server =require("http").createServer(app);
const io = require("socket.io")(server, {
	cors: {
		// origin: "*",
		methods: [ "GET", "POST" ]
	}
});

const connect = () =>{
  mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log("connected to DB"))
}

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', postRoutes);
app.use("/user", userRouter);

app.get('/', (req,res)=>{
  res.send("Hello welcome to BlogsStop API");
})

const PORT = process.env.PORT;

server.listen(PORT, () => {
  cors:true
  connect();
  console.log("connnected");
  })


  io.on("connection", (socket) => {

    socket.on("join_room", (data) => {
      socket.join(data);
    });
  
    socket.on("send_message", (data) => {
      socket.to(data.room).emit("receive_message", data);
    });
  
    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });

mongoose.set('useFindAndModify', false);