import express from "express";
const app = express();
import connectDB from "./db/connect.js";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import "express-async-errors";

import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

// middlewares
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

app.use(cors());
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));
// app.use(helmet());
// app.use(xss());
// app.use(mongoSanitize());

import cloudinary from "cloudinary";
const myCloudinary = cloudinary.v2;
myCloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOUD_API_SECRET,
});
import fileUpload from "express-fileupload";

// routes
import authRoutes from "./routes/authRouter.js";

app.get("/", (req, res) => {
	res.setHeader("Acess-Control-Allow-Credentials", "true");
	res.send("API is running");
});
app.use("/api/v1/auth", authRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URL);
		app.listen(PORT, () => console.log(`Server running on PORT ${5000}`));
	} catch (error) {
		console.log(error);
	}
};

start();
