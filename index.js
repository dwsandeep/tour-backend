
import dotenv from  'dotenv';
import {app} from './app.js';
import connectDB from './src/db/index.js';

dotenv.config()

connectDB().then(()=>{
    app.listen((process.env.PORT), ()=>{
        console.log(`server started on port ${process.env.PORT}`)
    })
}).catch((err)=>{
    console.log(err)
})









// import dotenv from 'dotenv';
// import {app} from './app.js' ;
// import connectDB from './src/db/index.js';
// dotenv.config()

// connectDB()
// .then(() =>{
//     app.listen(process.env.PORT, () =>{
//         console.log(`Server is running on port ${process.env.PORT}`);
//     })
// }).catch((err) =>{
//     console.log(err);
// })





// // import express from 'express';
// // const express = require('express');
// // const { courses } = require('./service');
// // require('dotenv').config()
// import dotenv from 'dotenv';
// import connectDB from './src/db/index.js';
// import {app} from './app.js'

// dotenv.config(
//     {
//         path:'./env'
//     }
// )
// connectDB()
// .then(() => {
//     app.listen(process.env.PORT || 8000, () => {
//         console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
//     })
// })
// .catch((err) => {
//     console.log("MONGO db connection failed !!! ", err);
// })
// // const app = express();
// // app.get('/',(req, res)=>{
// //     res.send('Hello Vibely');
// // })
// // // app.get('/api/courses', (req, res)=>{
// // //     res.json({courses: courses});
// // // })
// // app.listen(PORT, ()=>{
// //     console.log(`Server is running on port ${PORT}`);
// // })