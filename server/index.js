// const express = require("express");
// const mongopse = require("mongoose");
// const cors = require("cors");
// const EmployeeModel = require("./models/Employee");

// const app = express();
// app.use(express.json());
// app.use(cors());

// mongopse.connect("mongodb://localhost:27017/employee");

// app.post("/login", (req, res) => {
//   const { email, password } = req.body;
//   EmployeeModel.findOne({ email: email }).then((user) => {
//     if (user) {
//       if (user.password === password) {
//         res.json("Login Successful");
//       } else {
//         res.json("Password is Incorrect");
//       }
//     } else {
//       res.json("No Record Found");
//     }
//   });
// });

// app.post("/register", (req, res) => {
//   EmployeeModel.create(req.body)
//     .then((employees) => res.json(employees))
//     .catch((err) => res.json(err));
// });

// app.listen(3001, () => {
//   console.log("server is running");
// });
// -----------------------------------------------------------------------------
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/Employee");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ DB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/employee")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// ================= LOGIN =================
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await EmployeeModel.findOne({ email });

    if (!user) {
      return res.json("No Record Found");
    }

    if (user.password !== password) {
      return res.json("Password is Incorrect");
    }

    res.json("Login Successful");
  } catch (err) {
    console.log(err);
    res.status(500).json("Error");
  }
});

// ================= REGISTER =================
app.post("/register", async (req, res) => {
  try {
    const { name, email, password, gender, mobile } = req.body;

    // ✅ Check all fields
    if (!name || !email || !password || !gender || !mobile) {
      return res.json("All fields are required");
    }

    // ✅ Prevent duplicate email
    const existingUser = await EmployeeModel.findOne({ email });
    if (existingUser) {
      return res.json("User already exists");
    }

    const newUser = await EmployeeModel.create({
      name,
      email,
      password,
      gender,
      mobile,
    });

    res.json(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).json("Error registering user");
  }
});

// ================= SERVER =================
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
