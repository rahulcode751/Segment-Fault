import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config({
  path: "config.env"
});

import userRoutes from './routes/users.js';
import questionRoutes from './routes/Questions.js';
import answerRoutes from './routes/Answers.js';


const app = express();
// const corsOptions = {
//   origin: 'http://localhost:3000',
//   credentials: true,            //access-control-allow-credentials:true
//   optionSuccessStatus: 200
// }
// app.use(cors(corsOptions));

//dotenv.config();
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
const corsOrigin = {
  origin: true, //or whatever port your frontend is using
  credentials: true,
  // optionSuccessStatus: 200
}
// app.use(cors({ origin: true, credentials: true }));
// app.use(cors(corsOrigin));
app.options('*', cors())
// app.use(cors());

app.get('/', (req, res) => {
  // res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-type");
  // res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
  res.send('This is our Segment Fault web App api');
});

//alert('User already Exist. ')

app.use('/user', userRoutes);
app.use('/questions', questionRoutes);
app.use('/answer', answerRoutes);

const PORT = process.env.PORT || 5000;

const DATABASE_URL = process.env.CONNECTION_URL;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);

  mongoose
    .connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(console.log('Rahul:=> MongoDB is connected successfully'))
    .catch((err) => console.log('Error: ', err));
});

// var express = require('express');
// var app = express();
// var PORT = 3000;

// // Without middleware
// app.get('/user', function (req, res) {
//     res.status(404).json({ message: "User already Exist." })
// })

// app.listen(PORT, function (err) {
//     if (err) console.log(err);
//     console.log("Server listening on PORT", PORT);
// });
