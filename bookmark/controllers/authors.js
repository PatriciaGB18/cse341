const Author = require('../models/authors');

const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving authors', error: error.message });
  }
};

const getSingleAuthor = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).json({ message: 'Author not found' });
    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving author', error: error.message });
  }
};

const createAuthor = async (req, res) => {
  try {
    const newAuthor = new Author({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      biography: req.body.biography,
      nationality: req.body.nationality
    });
    const savedAuthor = await newAuthor.save();
    res.status(201).json(savedAuthor);
  } catch (error) {
    res.status(400).json({ message: 'Error creating author', error: error.message });
  }
};

const updateAuthor = async (req, res) => {
  try {
    const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedAuthor) return res.status(404).json({ message: 'Author not found' });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: 'Error updating author', error: error.message });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const deletedAuthor = await Author.findByIdAndDelete(req.params.id);
    if (!deletedAuthor) return res.status(404).json({ message: 'Author not found' });
    res.status(200).json({ message: 'Author deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting author', error: error.message });
  }
};

module.exports = { getAllAuthors, getSingleAuthor, createAuthor, updateAuthor, deleteAuthor };