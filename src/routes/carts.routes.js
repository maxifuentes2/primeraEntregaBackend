import { Router } from 'express';
import CartManager from '../managers/CartManager.js';

const router = Router();
const cartManager = new CartManager('./src/data/carts.json');

router.post('/', async (req, res) => {
    const newCart = await cartManager.createCart();
    res.status(201).json(newCart);
});

router.get('/:cid', async (req, res) => {
    const cart = await cartManager.getCartById(req.params.cid);
    cart ? res.json(cart) : res.status(404).send('Cart not found');
});

router.post('/:cid/product/:pid', async (req, res) => {
    const updatedCart = await cartManager.addProductToCart(req.params.cid, req.params.pid);
    updatedCart ? res.json(updatedCart) : res.status(404).send('Cart not found');
});

export default router;