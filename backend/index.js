import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import { connectToDB } from "./src/database/db.js";
import { User } from "./src/models/user.js";
import { encryptPassword, verifyEncodedPassword } from "./src/utils/passwordUtils.js";
import { generateAuthToken } from "./src/utils/authTokenUtils.js";
import { authenticateUser } from "./src/middlewares/auth.js";
import { authRouter } from "./src/routes/authRoutes.js";
import { SearchHistory } from "./src/models/search.js";
import { userRouter } from "./src/routes/userRoutes.js";

dotenv.config()
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);


app.get("/",authenticateUser, (req, res) => {
  res.send("Hey from Server!");
});


app.use('/',authRouter)
app.use('/',authenticateUser,userRouter)
// app.use('/',authenticateUser,authRouter)

connectToDB();
app.listen(process.env.SERVER_PORT, () => {
  console.log("Server Started Listening On Port => ", process.env.SERVER_PORT);
});
