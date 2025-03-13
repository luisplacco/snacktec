const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Produto = sequelize.define('Produto', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  timestamps: true,
  createdAt: 'data_criacao',
  updatedAt: false
});

module.exports = Produto;