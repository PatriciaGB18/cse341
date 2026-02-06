const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  isbn: {
    type: String,
    required: [true, 'ISBN is required'],
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required']
  },
  stockQuantity: {
    type: Number,
    required: [true, 'Stock quantity is required']
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: [true, 'Author ID is required']
  },
  genreId: {
    type: String, 
    required: [true, 'Genre ID is required']
  }
});

module.exports = mongoose.model('Book', bookSchema);