const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// Create
router.post('/addProduct', async (req, res) => {
  try {
    const { userId, productId, count } = req.body;
    if (userId === undefined || productId === undefined || count === undefined) {
      return res.status(404).json({ error: 'All fields required' });
    }
    const newCart = await prisma.cart.create({
      data: { userId: Number(userId), productId: Number(productId), count: Number(count) }
    });
    return res.status(201).json(newCart);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Read
router.get('/getById/:id', async (req, res) => {
  try {
    const cartId = Number(req.params.id);
    const cart = await prisma.cart.findUnique({ where: { cartId } });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });
    return res.status(200).json(cart);
  } catch (err) {
    return res.status(404).json({ error: 'Cart not found' });
  }
});

// Patch
router.patch('/patch/:id', async (req, res) => {
  try {
    const cartId = Number(req.params.id);
    const updates = req.body;
    const existing = await prisma.cart.findUnique({ where: { cartId } });
    if (!existing) return res.status(404).json({ error: 'Cart not found' });
    const data = {};
    if (updates.userId !== undefined) data.userId = Number(updates.userId);
    if (updates.productId !== undefined) data.productId = Number(updates.productId);
    if (updates.count !== undefined) data.count = Number(updates.count);
    const updated = await prisma.cart.update({ where: { cartId }, data });
    return res.status(200).json(updated);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete
router.delete('/removeProduct/:id', async (req, res) => {
  try {
    const cartId = Number(req.params.id);
    const existing = await prisma.cart.findUnique({ where: { cartId } });
    if (!existing) return res.status(404).json({ error: 'Cart not found' });
    await prisma.cart.delete({ where: { cartId } });
    return res.status(200).json({ message: 'Cart deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
