import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import router from './routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser';
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://2025-flower-shop.vercel.app"],
    credentials: true,
  })
);
//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send({
    Message: "Flower server Is Runing",
  });
});

app.use("/api/v1", router);
app.use(globalErrorHandler);
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "API NOT FOUND!",
        error: {
            path: req.originalUrl,
            message: "Your requested path is not found!"
        }
    })
})

export default app