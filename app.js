
import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:process.env.CORS_ORIGIN
}))

const errorHandler = (err, req, res, next)=>{
    res.status(err.statusCode || 500).json({
        success:false,
        errors: err.errors,
        message: err.message
    })
}
//import route
import userRouter from './src/routes/user.routes.js';
import subscriptionRouter from './src/routes/subscription.routes.js';
import courseRouter from './src/routes/course.routes.js';
import serviceRouter from './src/routes/service.routes.js';
import carRouter from './src/routes/car.routes.js';
import packageRouter from './src/routes/package.routes.js';
import bookingRouter from './src/routes/booking.routes.js';
//declare route
app.use('/users', userRouter)
app.use('/subscription', subscriptionRouter)
app.use('/course', courseRouter)
app.use('/api/services', serviceRouter)
app.use('/api/cars', carRouter)
app.use('/api/packages', packageRouter)
app.use('/api/bookings', bookingRouter)
app.use(errorHandler)
export {app}






// import express from 'express';
// import cors from 'cors';
// const app = express();

// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true
// }))
// app.use(express.json({limit: "16kb"}));
// const errorHandler = (err, req, res, next) => {
//     res.status(200).json({
//         success: false,
//         errors: err.errors || [],
//         message: err.message
//     })
// }
// app.use(errorHandler);

// // routes import
// import courseController from './src/routes/course.routes.js';
// // route declaration
// app.use('/api/v1/course', courseController);
// export {app};






// import express from 'express';

// const app = express();

// export {app};

// const errorHandler = (err, req, res, next) => {
//     res.status(err.statusCode || 400).json({
//         success: false,
//         message: err.message,
//         errors: err.errors || []
//     })
// }
// app.use(errorHandler);

// //import routes
// import courseRouter from './src/routes/course.routes.js';

// //route declaration
// app.use('/api/v1/course', courseRouter);