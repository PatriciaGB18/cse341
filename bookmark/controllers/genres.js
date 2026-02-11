const Genre = require('../models/genres');

const getAll = async (req, res) => {
  try {
    const genres = await Genre.find();
    res.status(200).json(genres);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).json({ message: "Genre not found" });
    res.status(200).json(genre);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createGenre = async (req, res) => {
  const genre = new Genre({
    name: req.body.name,
    description: req.body.description
  });
  try {
    const newGenre = await genre.save();
    res.status(201).json(newGenre);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateGenre = async (req, res) => {
  try {
    const updatedGenre = await Genre.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedGenre) return res.status(404).json({ message: "Genre not found" });
    res.status(200).json(updatedGenre);
  } catch (err) {
    res.status(400).json({ message: err.message });
  } };

const deleteGenre = async (req, res) => {
  try {
    const deletedGenre = await Genre.findByIdAndDelete(req.params.id);
    if (!deletedGenre) return res.status(404).json({ message: "Genre not found" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};  
module.exports = {
  getAll,
  getSingle,
  createGenre,
  updateGenre,
  deleteGenre
};