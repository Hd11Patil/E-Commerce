// const mongoose = require("mongoose");

// const EmployeeSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
// });

// const EmployeeModel = mongoose.model("employees", EmployeeSchema);
// module.exports = EmployeeModel;
// --------------------------------------------------
const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // 🔥 prevent duplicate emails
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
});

const EmployeeModel = mongoose.model("employees", EmployeeSchema);
module.exports = EmployeeModel;
