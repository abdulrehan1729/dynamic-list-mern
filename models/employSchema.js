const mongoose = require("mongoose");
const { Schema } = mongoose;
const employListSchema = new Schema({
  name: String,
  employeeId: Number,
  department: String,
  email: String,
  dateOfJoining: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
const employeeModel = mongoose.model("employSchema", employListSchema);
module.exports = employeeModel;
