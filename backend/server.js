import express from 'express';
import dotenv from 'dotenv';
//cors config ediliyor

import cors from 'cors';
import colors from 'colors'
//rotalar import ediliyor 
import router from './routes/index.js';
//veritabanı import 

import connectDB from './config/db.js';

//dotenv config ediliyor 



dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001


app.use(cors({
    origin: "http://localhost:3000", // allow all origins
    credentials: true, // send cookies
}));

//gelen istekleri görmek için bir meddleware ! 
app.use((req, res, next) => {
    console.log(`Yeni istek: ${req.method} ${req.url}`.bgCyan.bold.italic);
    next();
});

app.use(express.json());

//bir endpoint eklemek için bir route yazıyoruz ------------
app.use('/api', router);
//----------------------------------------------------------



const serverStart = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server Başaltıldı ! http://localhost:${PORT}`.yellow.italic);
        })
    } catch (error) {
        console.error(error);
    }
}

serverStart();
