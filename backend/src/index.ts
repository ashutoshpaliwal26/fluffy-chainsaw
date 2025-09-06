import dbConnection from "./config/db";
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import authRoutes from "./routes/authRoutes";
import productRouter from "./routes/productRoutes";
import { createMessage } from "./utils/smsService";
import { userRoutes } from "./routes/userRoutes";

dotenv.config();

const db_connection_str = process.env.MONGO_DB_CONNECTION_URL as string;
const port = process.env.PORT || 8000;


dbConnection(db_connection_str);

const app = express();

app.use(express.json());
app.use(cors());

// createMessage("Testing...", "+916367180418");

app.use("/v1/api/auth/", authRoutes);
app.use("/v1/api/product", productRouter);
app.use("/v1/api/user", userRoutes);

app.listen(port as number, "0.0.0.0", () => console.log(`Server is Up and Running on PORT : http://localhost:${port}`))