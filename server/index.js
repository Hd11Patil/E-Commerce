// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const EmployeeModel = require("./models/Employee");

// const app = express();
// app.use(express.json());
// app.use(cors());

// // ✅ DB Connection
// mongoose
//   .connect("mongodb://127.0.0.1:27017/employee")
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log(err));

// // ================= LOGIN =================
// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await EmployeeModel.findOne({ email });

//     if (!user) {
//       return res.json("No Record Found");
//     }

//     if (user.password !== password) {
//       return res.json("Password is Incorrect");
//     }

//     res.json("Login Successful");
//   } catch (err) {
//     console.log(err);
//     res.status(500).json("Error");
//   }
// });

// // ================= REGISTER =================
// app.post("/register", async (req, res) => {
//   try {
//     const { name, email, password, gender, mobile } = req.body;

//     // ✅ Check all fields
//     if (!name || !email || !password || !gender || !mobile) {
//       return res.json("All fields are required");
//     }

//     // ✅ Prevent duplicate email
//     const existingUser = await EmployeeModel.findOne({ email });
//     if (existingUser) {
//       return res.json("User already exists");
//     }

//     const newUser = await EmployeeModel.create({
//       name,
//       email,
//       password,
//       gender,
//       mobile,
//     });

//     res.json(newUser);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json("Error registering user");
//   }
// });

// // ================= SERVER =================
// app.listen(3001, () => {
//   console.log("Server is running on port 3001");
// });

// --------------------------------------------------------------------------------------

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
      return res.json({ status: "error", message: "No Record Found" });
    }

    if (user.password !== password) {
      return res.json({ status: "error", message: "Password Incorrect" });
    }

    // ✅ Send user data
    res.json({
      status: "success",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        mobile: user.mobile,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error" });
  }
});

// ================= REGISTER =================
app.post("/register", async (req, res) => {
  try {
    const { name, email, password, gender, mobile } = req.body;

    if (!name || !email || !password || !gender || !mobile) {
      return res.json("All fields are required");
    }

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

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
