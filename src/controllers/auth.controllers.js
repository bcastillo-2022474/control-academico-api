import { hashPassword, isPassword } from "../helpers/encryption.js";
import User from "../model/user.js";
import { generateToken } from "../helpers/jwt.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, tp_status: true });
  if (!user) {
    return res
      .status(401)
      .json({ error: "Invalid credentials, user not found" });
  }

  if (!(await isPassword(password, user.password))) {
    return res
      .status(401)
      .json({ error: "Invalid credentials, password incorrect" });
  }

  res.status(200).json(user);
};

export const signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  const encryptedPassword = hashPassword(password);
  const user = new User({ name, email, password: encryptedPassword, role });
  await user.save();
  const token = await generateToken({ name, email, role, uid: user._id }).catch(
    () => {
      res
        .status(500)
        .json({ error: "Error generating token, try again in a few minutes" });
    },
  );
  if (!token) {
    return;
  }
  res.status(201).json({ ...user._doc, token });
};
