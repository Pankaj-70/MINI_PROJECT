import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kB" }));
app.use(urlencoded({ limit: "16kb", extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

import userRouter from "./routes/user.routes.js";
import cartRouter from "./routes/cart.routes.js";
import productRouter from "./routes/product.routes.js";
import emailRouter from "./routes/mail.routes.js";
import adminUserRouter from "./routes/admin/user.routes.js";
import orderRouter from "./routes/order.routes.js";
import paypalRouter from "./routes/paypalroutes.js";
app.use("/api/v1/user", userRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/mail", emailRouter);
app.use("/api/v1/admin", adminUserRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/paypal", paypalRouter);

export { app };
