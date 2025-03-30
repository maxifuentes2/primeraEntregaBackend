import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const productManager = new ProductManager('./src/data/products.json');

router.get('/', async (req, res) => {
    const products = await productManager.getAll();
    res.json(products);
});

router.get('/:pid', async (req, res) => {
    const product = await productManager.getById(req.params.pid);
    product ? res.json(product) : res.status(404).send('Product not found');
});

router.post('/', async (req, res) => {
    const { title, description, code, price, stock, category, thumbnails } = req.body;

    if (!title || !description || !code || !price || !stock || !category) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios excepto thumbnails.' });
    }

    const newProduct = await productManager.addProduct({
        title,
        description,
        code,
        price,
        status: true,
        stock,
        category,
        thumbnails: thumbnails || [],
    });

    res.status(201).json(newProduct);
});

router.put('/:pid', async (req, res) => {
    const updatedProduct = await productManager.updateProduct(req.params.pid, req.body);
    updatedProduct ? res.json(updatedProduct) : res.status(404).send('Product not found');
});

router.delete('/:pid', async (req, res) => {
    const success = await productManager.deleteProduct(req.params.pid);
    success ? res.sendStatus(204) : res.status(404).send('Product not found');
});

export default router;