const bcrypt = require('bcrypt');
const User = require("../models/usersModels");
const jwt = require("jsonwebtoken")
const saltround = 10

exports.createUser = async (req, res, next) => {
  try {
    if (!req.body.username || !req.body.email || !req.body.password) {
      return res.status(400).send({
        message: "bad request",
      });
    }
    const {username,email,password} = req.body

    const hashedPassword = await bcrypt.hash(password,saltround)

    const user = await User.create({
      username:username,
      email:email,
      password: hashedPassword
    })

    
    res.json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).json({
      messege: error.messege,
    });
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const {email,password} = req.body

    if (!email && !password) {
      return res.status(400).send({
        message: "email and password is missing",
      });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    const hashedPassword = user.password;
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    if (!passwordMatch) {
      return res.status(400).send({
        message: "Incorrect password",
      });
    }
    const token = jwt.sign({ id: user.id },"test");

    res.status(200).send({
      message: "Login Successfully",
      token,
    });

  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Error while getting user",
      error: error.message,
    });
  }
};


exports.getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.listAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = req.body;

    const users = await User.findOne({ where: { id: userId } });
    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }
    await User.update(userData, { where: { id: userId } });
    const updatedUser = await User.findByPk(userId);

    return res.json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = req.body;

    const users = await User.findOne({ where: { id: userId } });
    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }
    await User.destroy({ where: { id: userId } });
    return res.json({message:"user deleted succesfully"});
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
