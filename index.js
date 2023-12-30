const express = require("express");
require("dotenv").config();
require("express-async-errors");
const cors = require("cors");
const connectDB = require("./database/connect");

//routers
const authRouter = require("./routes/authRoute");
const CVRouter = require("./routes/CVRouter");

//middlewares
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
// const authMiddleware = require("./middleware/authMiddleware");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/cv", CVRouter);

app.get("/", (req, res) => res.status(200).send("server for cv builder"));

app.use(notFound);
app.use(errorHandler);

async function startServer() {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(process.env.PORT, () => console.log("server started"));
	} catch (error) {
		console.log(error);
	}
}

startServer();
