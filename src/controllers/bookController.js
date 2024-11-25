const Book = require("../models/Book");

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Error fetching book", error });
  }
};

exports.getBooksByAuthor = async (req, res) => {
  try {
    const books = await Book.findAll({ where: { author: req.params.author } });
    if (!books.length)
      return res.status(404).json({ message: "No books found by this author" });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books by author", error });
  }
};

exports.createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: "Error creating book", error });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Book.update(req.body, { where: { id } });
    if (!updated) return res.status(404).json({ message: "Book not found" });
    res.json({ message: "Book updated successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error updating book", error });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Book.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: "Book not found" });
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting book", error });
  }
};
