const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Usuario = require('./usuario');
const Produto = require('./produto');

const Pedido = sequelize.define('Pedido', {
  id_usuario: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuario,
      key: 'id'
    }
  },
  id_produto: {
    type: DataTypes.INTEGER,
    references: {
      model: Produto,
      key: 'id'
    }
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pendente', 'preparando', 'pronto', 'entregue'),
    defaultValue: 'pendente'
  },
  codigo_pedido: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  }
}, {
  timestamps: true,
  createdAt: 'data_criacao',
  updatedAt: false
});

module.exports = Pedido;