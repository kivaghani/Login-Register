const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNo: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
