const express = require('express');
const Pedido = require('../models/pedido');

const router = express.Router();

// Rota para listar todos os pedidos
router.get('/', async (req, res) => {
  try {
    const pedidos = await Pedido.findAll();
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para criar um novo pedido
router.post('/', async (req, res) => {
  const { id_usuario, id_produto, quantidade, codigo_pedido } = req.body;

  try {
    const pedido = await Pedido.create({ id_usuario, id_produto, quantidade, codigo_pedido });
    res.status(201).json(pedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;