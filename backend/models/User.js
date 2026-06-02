const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const saltRounds = Number(process.env.SALT_ROUNDS)

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

userSchema.pre("save", async function (next) {
    if (this.isNew || this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};
 
const User = mongoose.model("User", userSchema);
 



// Set up pre-save middleware to create password

module.exports = User;