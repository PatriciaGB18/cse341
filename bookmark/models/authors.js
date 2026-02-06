const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required']
  },
  biography: {
    type: String,
    required: [true, 'Biography is required']
  },
  nationality: {
    type: String,
    required: [true, 'Nationality is required']
  }
});

module.exports = mongoose.model('Author', authorSchema);