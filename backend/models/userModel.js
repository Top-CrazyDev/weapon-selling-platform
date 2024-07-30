const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { 
    type: String,
    required: true
  },
  email: { 
    type: String,
    required: true,
    unique: true
  },
  username: { 
    type: String,
    unique: true
  },
  password: { 
    type: String,
    required: true,
    minlength: 5
  },
  role: {
    type: String,
    enum: ['admin', 'customer', 'vendor'],
    default: 'customer'
  },
  phone: {
    type: String
  },
  address: {
    type: String
  },
  address2: {
    type: String
  },
  zipCode: {
    type: String
  },
  city: {
    type: String
  },
  country: {
    type: String
  },
  state: {
    type: String
  },
  identity: {
    type: String
  },
  fflNumber: {
    type: String
  },
  fflDocument: {
    type: String
  },
  otp: {
    type: String
  },
  isOtp: {
    type: Boolean,
    default: true
  },
  resetToken: { 
    type: String 
  },
  resetTokenExpiration: { 
    type: Date 
  }
});

module.exports = User = mongoose.model("user", userSchema);