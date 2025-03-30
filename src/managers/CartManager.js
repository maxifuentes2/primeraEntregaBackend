import fs from 'fs/promises';

class CartManager {
    constructor(filePath) {
        this.filePath = filePath;
    }

    async getAll() {
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async saveAll(carts) {
        try {
            await fs.writeFile(this.filePath, JSON.stringify(carts, null, 2));
        } catch (error) {
            throw new Error('Error al guardar los carritos');
        }
    }

    async getCartById(id) {
        try {
            const carts = await this.getAll();
            return carts.find(cart => cart.id === Number(id));
        } catch (error) {
            throw new Error('Error al obtener el carrito');
        }
    }

    async createCart() {
        try {
            const carts = await this.getAll();
            const newCart = {
                id: carts.length > 0 ? carts[carts.length - 1].id + 1 : 1,
                products: [],
            };

            carts.push(newCart);
            await this.saveAll(carts);
            return newCart;
        } catch (error) {
            throw new Error('Error al crear el carrito');
        }
    }

    async addProductToCart(cartId, productId) {
        try {
            const carts = await this.getAll();
            const cartIndex = carts.findIndex(cart => cart.id === Number(cartId));

            if (cartIndex === -1) return null;

            const cart = carts[cartIndex];
            const productIndex = cart.products.findIndex(p => p.product === Number(productId));

            if (productIndex !== -1) {
                cart.products[productIndex].quantity += 1;
            } else {
                cart.products.push({ product: Number(productId), quantity: 1 });
            }

            await this.saveAll(carts);
            return cart;
        } catch (error) {
            throw new Error('Error al agregar el producto al carrito');
        }
    }
}

export default CartManager;