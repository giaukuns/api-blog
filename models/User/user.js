const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema({
  firstName: {
    type: String,
    get: function (value) {
      return value[0].toUpperCase() + value.slice(1).toLowerCase(); //
    }, // giau => Giau
    set: function (value) {
      return value.toLowerCase(); // GIAU => giau
    },
  },
  lastName: {
    type: String,
    get: function (value) {
      return value[0].toUpperCase() + value.slice(1).toLowerCase(); // giau
    },
    set: function (value) {
      return value.toLowerCase();
    },
  },
  avatar: String,
  email: String,
  password: String,
});
User.virtual("fullName").get(function () {
  return this.firstName + " " + this.lastName;
  // return `${this.firstName} ${this.lastName}`
});
module.exports = mongoose.model("User", User); // new Student()
