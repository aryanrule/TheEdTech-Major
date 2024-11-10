const mongoose = require('mongoose');

const dummySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  work: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Dummy', dummySchema);
