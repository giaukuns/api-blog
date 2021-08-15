const mongoose = require("mongoose");
const validator = require("validator");
const passValidator = require("password-validator");
const bcrypt = require("bcrypt");
const connectDB = require("../../utils/connectDb");
const cloudinary = require("../../middlewares/cloudinary");
/**
 * Khai báo model
 */
const User = require("../../models/User/user");
const passSchema = new passValidator();
const passMinLen = 6;
const passMaxLen = 24;

// Scheme for password validation
// See ref https://github.com/tarunbatra/password-validator
passSchema
  .is()
  .min(passMinLen)
  .is()
  .max(passMaxLen)
  .has()
  .letters()
  .has()
  .digits();
/**
 * tạo user
 */
const createUser = async (req, res) => {
  try {
    connectDB();
    if (!req.body.email || !validator.isEmail(req.body.email)) {
      return res.status(400).json({
        data: null,
        errors: [{ message: "Email không hợp lệ" }],
      });
    }
    if (!passSchema.validate(req.body.password)) {
      return res.status(400).json({
        data: null,
        errors: [
          {
            message:
              "Mật khẩu phải dài 6-24 ký tự, bao gồm cả chữ cái và chữ số",
            code: "err001",
          },
        ],
      });
    }
    const checkEmail = await User.find({ email: req.body.email });

    if (checkEmail.length > 0) {
      return res.status(400).json({
        data: null,
        errors: [
          {
            message: "Email này đã được sử dụng.",
          },
        ],
      });
    }

    const newUser = new User({
      ...req.body,
    });
    console.log(newUser);
    // const salt = await bcrypt.genSalt(10);
    // newUser.password = await bcrypt.hash(newUser.password, salt);
    // const result = await newUser.save();

    // await User.find();

    // return res.status(200).json({
    //   success: true,
    //   msg: "Thêm mới thành công",
    //   data: result,
    // });
  } catch (error) {
    return res.status(500).json({
      data: null,
      errors: [{ message: error.message }],
    });
  }
};
/**
 * Tìm user
 */

module.exports = {
  createUser,
};
