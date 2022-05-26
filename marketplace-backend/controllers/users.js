const User = require("../models/user");

// jwt, bcrypt
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

module.exports.register = async (req, res) => {
  const user = req.body;
  const existingUser = await User.find({ email: user.email });
  if (existingUser.length > 0) {
    res.json({ error: "User Exist" });
  } else {
    const hashedPassword = await bcrypt.hash(user.password, 12);
    const newUser = new User({email: user.email, password: hashedPassword});
    await newUser.save();
    // create token
    const token = jwt.sign(
      { userId: newUser.id, userEmail: newUser.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    // return user info and token
    res.json({ userId: newUser.id, userEmail: newUser.email, token });
  }
}

module.exports.login = async (req, res) => {
  const loginInfo = req.body;
  const existingUser = await User.find({ email: loginInfo.email });

  if (existingUser.length > 0) {
    // checking login credential
    const validated = await bcrypt.compare(loginInfo.password, existingUser[0].password);

    if (validated) {
      // create token
      const token = jwt.sign(
        { userId: existingUser[0].id, userEmail: existingUser[0].email },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
      );
      // return user info and token
      res.json({
        userId: existingUser[0].id,
        userEmail: existingUser[0].email,
        token,
      });
    } else {
      console.log('Wrong Password!');
      res.json({ error: "Wrong Password!" });
    }
  } else {
    console.log('No User With Such Email!');
    res.json({ error: "No User With Such Email!" });
  }
}