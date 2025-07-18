import bcrypt from 'bcrypt';
import User from '../model/user.js';
import jwt from 'jsonwebtoken';

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
 const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send({ success: false, message: "User already registered" });
    }



  try {
    // MISSING `await` here
    const salt = await bcrypt.genSalt(10);

    // MISSING `await` here
    const hashedPassword = await bcrypt.hash(password, salt);

    // Make sure the field is `password`, not `hashedPassword`
    const result = await User.create({ name, email, password: hashedPassword });

    if (result) {
      // Always sign an object as payload, not raw email
      const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1d' });
 

      return res.status(201).send({ success: true, token });
    } else {
      return res.status(500).send({ success: false, message: "User not created" });
    }
  } catch (error) {
    console.error("Registration Error:", error.message);
    return res.status(500).send({ success: false, message: error.message });
  }
};



const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ success: false, message: "Incorrect password" });
    }

    const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1d' });

    return res.send({ success: true, token });
  } catch (error) {
    console.error("Login Error:", error.message);
    return res.status(500).send({ success: false, message: error.message });
  }
};

export { registerUser, loginUser };


