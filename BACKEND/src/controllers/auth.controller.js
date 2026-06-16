const userModel = require("../models/User.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
};

async function registerController(req, res) {
  const { email, username, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExists) {
    return res.status(409).json({
      message:
        "User already exists " +
        (isUserAlreadyExists.email == email
          ? "Email already exists"
          : "Username already exists"),
    });
  }

  const hash = crypto.createHash("sha256").update(password).digest("hex");

  const user = await userModel.create({
    username,
    email,
    password: hash,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "3d" },
  );

  res.cookie("token", token, cookieOptions);

  res.status(201).json({
    message: "User Registered successfully",
    user: {
      email: user.email,
      username: user.username,
    },
  });
}

async function loginController(req, res) {
  const { username, email, password } = req.body;
  const user = await userModel
    .findOne({
      $or: [
        {
          username: username,
        },
        {
          email: email,
        },
      ],
    })
    .select("+password");

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const hash = crypto.createHash("sha256").update(password).digest("hex");

  const isPasswordValid = hash == user.password;

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "password invalid",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  res.cookie("token", token, cookieOptions);

  res.status(200).json({
    message: "User loggedIn successfully.",
    user: {
      username: user.username,
      email: user.email,
    },
  });
}

async function getMeController(req, res) {
  const user = await userModel.findById(req.user.id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.status(200).json({
    message: "User found successfully.",
    user: {
      username: user.username,
      email: user.email,
    },
  });
}

async function logoutController(req, res) {
  const user = await userModel.findById(req.user.id);

  res.clearCookie("token");
  res.status(200).json({
    message: "User logged out successfully.",
  });
}

module.exports = {
  registerController,
  loginController,
  getMeController,
  logoutController,
};
