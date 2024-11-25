const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Koneksi database

// Definisi model Book
const Book = sequelize.define('Book', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'books', // Nama tabel di database
  timestamps: true,   // Aktifkan timestamps untuk createdAt dan updatedAt
});

// Sinkronisasi model dengan database (opsional untuk development)
(async () => {
  try {
    await Book.sync({ alter: true }); // Alter hanya saat pengembangan
    console.log('Book table has been synchronized.');
  } catch (error) {
    console.error('Error syncing Book table:', error);
  }
})();

module.exports = Book;
