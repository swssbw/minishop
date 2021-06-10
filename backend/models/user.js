const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: [true, 'Please enter your name'],
    maxLength: [30, 'Your name cannot exceed 30 characters']
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    validate: [validator.isEmail, 'Please enter valid email address']
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minLength: [6, 'Your password must be longer than 6 characters'],
    select: false
  },
  role: {
    type: String,
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

// Encryting password before saving
userSchema.pre('save', async function(next) {
  if(!this.isModified('password')) {
    next();
  } 

  this.password = await bcrypt.hash(this.password, 10);
})

// Return JWT token
userSchema.methods.getJwtToken = function() {
  return jwt.sign({ id:this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME
  });
}


//Compare user pw
userSchema.methods.comparePassword = async function(enterpassword) {
  return await bcrypt.compare(enterpassword, this.password)
}

module.exports = mongoose.model('User', userSchema);