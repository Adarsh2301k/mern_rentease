import express from 'express'
import connectDB from './libs/db.js'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoute from './routes/authRoute.js'
import itemRoute from './routes/itemRoute.js'
import cartRoute from './routes/cartRoute.js'


dotenv.config();

const app=express();

app.use(express.json());

app.use(cors({ origin: "*", credentials: true }));
connectDB();

app.use("/api/auth", authRoute);
app.use("/api/items", itemRoute);
app.use("/api/cart", cartRoute);
const PORT=process.env.PORT || 4000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

