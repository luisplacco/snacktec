const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Usuario = sequelize.define('Usuario', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo: {
    type: DataTypes.ENUM('aluno', 'tio_cantina'),
    allowNull: false
  }
}, {
  timestamps: true,
  createdAt: 'data_criacao',
  updatedAt: false
});

module.exports = Usuario;