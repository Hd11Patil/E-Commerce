  // const mongoose = require("mongoose");

  // const EmployeeSchema = new mongoose.Schema({
  //   name: {
  //     type: String,
  //     required: true,
  //   },
  //   email: {
  //     type: String,
  //     required: true,
  //     unique: true, // 🔥 prevent duplicate emails
  //   },
  //   password: {
  //     type: String,
  //     required: true,
  //   },
  //   gender: {
  //     type: String,
  //     required: true,
  //   },
  //   mobile: {
  //     type: String,
  //     required: true,
  //   },
  // });

  // const EmployeeModel = mongoose.model("employees", EmployeeSchema);
  // module.exports = EmployeeModel;
// -----------------------------------------------------------------
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const EmployeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },

    mobile: {
      type: String,
      required: true,
    },

    // 🔥 IMPORTANT for admin panel
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

// ================= PASSWORD HASH =================
EmployeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ================= PASSWORD COMPARE =================
EmployeeSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Employee", EmployeeSchema);