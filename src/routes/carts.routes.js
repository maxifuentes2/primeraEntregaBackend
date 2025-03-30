import { Router } from 'express';
import CartManager from '../managers/CartManager.js';

const router = Router();
const cartManager = new CartManager('./src/data/carts.json');

router.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el carrito' });
    }
});

router.get('/:cid', async (req, res) => {
    try {
        const cart = await cartManager.getCartById(req.params.cid);
        cart ? res.json(cart) : res.status(404).send('Cart not found');
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el carrito' });
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const updatedCart = await cartManager.addProductToCart(req.params.cid, req.params.pid);
        updatedCart ? res.json(updatedCart) : res.status(404).send('Cart not found');
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar el producto al carrito' });
    }
});

export default router;