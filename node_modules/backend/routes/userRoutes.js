const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const router = express.Router();

// Rota para registrar um novo usuário
router.post('/register', async (req, res) => {
  const { nome, email, senha, tipo } = req.body;

  try {
    // Verificar se o usuário já existe
    let usuario = await Usuario.findOne({ where: { email } });
    if (usuario) {
      return res.status(400).json({ msg: 'Usuário já existe' });
    }

    // Criar um novo usuário
    const hashedPassword = await bcrypt.hash(senha, 10);
    usuario = await Usuario.create({ nome, email, senha: hashedPassword, tipo });

    // Gerar token JWT
    const token = jwt.sign({ id: usuario.id }, 'secreta', { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para login de usuário
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Verificar se o usuário existe
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(400).json({ msg: 'Credenciais inválidas' });
    }

    // Verificar a senha
    const isMatch = await bcrypt.compare(senha, usuario.senha);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciais inválidas' });
    }

    // Gerar token JWT
    const token = jwt.sign({ id: usuario.id }, 'secreta', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;