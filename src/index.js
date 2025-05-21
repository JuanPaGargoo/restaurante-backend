const express = require('express'); // Importamos Express
const cors = require('cors');       // Permite peticiones de otro origen (como el frontend)
require('dotenv').config();         // Carga las variables de entorno desde .env
const path = require('path');

const app = express();              // Creamos la app de Express
const PORT = process.env.PORT || 3000;  // Puerto configurable

// Middlewares
app.use(cors());                    // Habilita CORS
app.use(express.json());            // Permite recibir JSON en el body

// Middleware para servir archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Ruta de prueba directa
app.get('/', (req, res) => {
  res.json({ mensaje: 'API funcionando 🎉' });
});

app.use('/api/categorias', require('./routes/categorias.routes'));
app.use('/api/platillos', require('./routes/platillos.routes'));
app.use('/api/mesas', require('./routes/mesas.routes'));
app.use('/api/cuentas', require('./routes/cuentas.routes'));
app.use('/api/pedidos', require('./routes/pedidos.routes'));
app.use('/api/pedido-platillos', require('./routes/pedidoPlatillos.routes'));
app.use('/api/pagos', require('./routes/pagos.routes'));

// Arrancar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
