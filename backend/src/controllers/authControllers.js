import { User } from "../models/user.js";
import { encryptPassword, verifyEncodedPassword } from "../utils/passwordUtils.js";
import { generateAuthToken } from "../utils/authTokenUtils.js";

export const handleRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const encrptyedPass = encryptPassword(password);

    const newUser = await User.create({
      username: username,
      email: email,
      password: encrptyedPass,
    });

    return res.json({ success: true, user: newUser });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message || "something went wrong!!",
    });
  }
};
export const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ where: { email: email } });
    if (!existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User Doesnot Exist!" });
    }
    // console.log(existingUser)

    const verifyPass = verifyEncodedPassword(password, existingUser.password);
    if (!verifyPass) {
      return res
        .status(400)
        .json({ success: false, message: "Credentials Are Invalid!" });
    }

    const authToken = generateAuthToken(existingUser, "1hr");

    return res.json({ success: true, authToken: authToken });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({
        success: false,
        message: error.message || "something went wrong!!",
      });
  }
};


