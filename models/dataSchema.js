const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  data: {
    type: String,
    required: [true, "Data is required"]
  },
  created: {
    type: Date,
    required: [true, "Created date is required"]
  }
});

module.exports = dataSchema;
