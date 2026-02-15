require("dotenv").config();
const express = require("express");
const authRoute = require("./routes/auth.route");
const cors = require("cors");
const connect_db = require("./config/db.config");

const app = express();
connect_db();
app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoute);

app.listen(8000, () => console.log("Listening on port 8000"));