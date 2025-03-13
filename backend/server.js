const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./models/index');
const Usuario = require('./models/usuario');
const Produto = require('./models/produto');
const Pedido = require('./models/pedido');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => res.send('API is running'));

app.listen(3000, async () => {
  console.log('Server is running on port 3000');
  try {
    await sequelize.sync();
    console.log('Database synced');
  } catch (error) {
    console.error('Unable to sync database:', error);
  }
});