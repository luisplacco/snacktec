const express = require('express');
const Produto = require('../models/produto');

const router = express.Router();

// Rota para listar todos os produtos
router.get('/', async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para criar um novo produto
router.post('/', async (req, res) => {
  const { nome, descricao, preco } = req.body;

  try {
    const produto = await Produto.create({ nome, descricao, preco });
    res.status(201).json(produto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;