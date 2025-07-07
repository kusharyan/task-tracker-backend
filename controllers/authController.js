const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const logger = require('../logger');

const registerUser = async(req, res)=> {
  const {email, password} = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });

    logger.info(`User registered: ${newUser.email}`);
    return res.status(201).send({ message: "User created", userId: newUser._id });
  } catch (error) {
    logger.error(`Registration failed: ${error.message}`)
    return res.status(500).send({ error: "User registration failed/ User Already exists!" });
  }
};

const loginUser = async (req, res) => {
  const {email, password} = req.body;
  try{
    const user = await User.findOne({ email });
    if (!user) {
      logger.warn(`Login failed: user not found - ${email}`);
      return res.status(400).send({ error: "Invalid credentials" });
    }

    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.warn(`Login failed: wrong password - ${email}`);
      return res.status(400).send({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    logger.info(`Login success: ${email}`);
    return res.send({message: 'Login Successfull',token, user: {userId: user._id, email: user.email}});

  } catch (error) {
    logger.error(`Login error for ${email}: ${error.message}`);
    return res.status(500).json({ error: "Login failed" });
  }
}

const getUserData = async (req, res) => {
  try{
    const users = await User.find();
    logger.info(`Fetched ${users.length} users successfully`);
    return res.status(200).send(users);
  } catch(error) {
    logger.error(`Failed to fetch users: ${error.message}`);
    return res.status(500).send({error : 'User not found!'});
  }
}

module.exports = {
  registerUser,
  loginUser,
  getUserData
}