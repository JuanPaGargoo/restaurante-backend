const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET: listar todas las cuentas
router.get('/', async (req, res) => {
  try {
    const cuentas = await prisma.cuentas.findMany(); 
    res.json(cuentas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST: agregar una nueva cuenta con relaciones anidadas
router.post('/crear', async (req, res) => {
  try {
    const { total, pagada, mesas, pagos, pedidos } = req.body;

    if (mesas && Array.isArray(mesas)) {
      for (const mesa of mesas) {
        if (mesa.id && mesa.estado) {
          await prisma.mesas.update({
            where: { id: mesa.id },
            data: { estado: mesa.estado }
          });
        }
      }
    }

    const nuevaCuenta = await prisma.cuentas.create({
      data: {
        total,
        pagada,
        creada_en : new Date(),
        mesas: mesas
          ? {
              connect: mesas
                .filter(m => m.id)
                .map(m => ({ id: m.id })),
              create: mesas
                .filter(m => !m.id)
                .map(m => ({ estado: m.estado })),
            }
          : undefined,
        pedidos: pedidos
          ? {
              create: pedidos.map(pedido => ({
                estado: pedido.estado,
                fecha: pedido.fecha,
                pedido_platillo: pedido.pedido_platillo
                  ? {
                      create: pedido.pedido_platillo.map(pp => ({
                        platillo_id: pp.platillo_id,
                        cantidad: pp.cantidad,
                        precio_unit: pp.precio_unit,
                      })),
                    }
                  : undefined,
              })),
            }
          : undefined,
      },
      include: {
        mesas: true,
        pagos: true,
        pedidos: {
          include: {
            pedido_platillo: true,
          },
        },
      },
    });

    res.status(201).json(nuevaCuenta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT: actualizar una cuenta por ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const cuentaActualizada = await prisma.cuentas.update({ 
      where: { id: parseInt(id) },
      data: req.body,
    });
    res.json(cuentaActualizada);
  } catch (error) {
    res.status(404).json({ error: 'Cuenta no encontrada' });
  }
});

// POST: agregar un pedido a una cuenta por ID
router.post('/:id/pedido', async (req, res) => {
  const { id } = req.params;
  const { estado, fecha, pedido_platillo } = req.body;

  try {
    const nuevoPedido = await prisma.pedidos.create({
      data: {
        estado,
        cuenta_id: Number(id),
        fecha,
        pedido_platillo: {
          create: pedido_platillo.map(pp => ({
            platillo_id: pp.platillo_id,
            cantidad: pp.cantidad,
            precio_unit: pp.precio_unit,
            
          })),
        },
      },
      include: { pedido_platillo: true },
    });
    res.status(201).json(nuevoPedido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST : registrar un pago para una cuenta por ID
router.post('/:id/pago', async (req, res) => {
  const { id } = req.params;
  const { monto, metodo, fecha } = req.body;
  try {
    await prisma.pagos.create({
      data: {
        cuenta_id: Number(id),
        monto,
        metodo,
        fecha,
      },
    });
    await prisma.cuentas.update({
      where: { id: Number(id) },
      data: { pagada: true },
    });
    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT liberar mesa y finalizar pedidos de una cuenta por ID
router.put('/:id/finalizar', async (req, res) => {
  const { id } = req.params;
  try {
    // Cambia la mesa a "libre"
    await prisma.mesas.updateMany({
      where: { cuenta_id: Number(id) },
      data: { estado: "libre", cuenta_id: null },
    });
    // Cambia los pedidos a "finalizado"
    await prisma.pedidos.updateMany({
      where: { cuenta_id: Number(id) },
      data: { estado: "finalizado" },
    });
    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE: eliminar una cuenta por ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.cuentas.delete({ where: { id: parseInt(id) } }); 
    res.json({ mensaje: 'Cuenta eliminada' });
  } catch {
    res.status(404).json({ error: 'Cuenta no encontrada' });
  }
});

// GET: cuentas con mesas y pedidos (para dashboard)
router.get('/dashboard', async (req, res) => {
  try {
    const cuentas = await prisma.cuentas.findMany({
      include: {
        mesas: true,
        pedidos: true,
      },
      orderBy: { creada_en: 'desc' }
    });

    // Formatea la respuesta para el frontend
    const result = cuentas.map(cuenta => ({
      id: cuenta.id,
      time: cuenta.creada_en ? cuenta.creada_en.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }) : '',
      table: cuenta.mesas.length > 0 ? cuenta.mesas[0].id : null,
      status: cuenta.pedidos.length > 0 ? cuenta.pedidos[0].estado : 'Sin pedidos',
      total: Number(cuenta.total)
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;