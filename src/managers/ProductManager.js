import fs from 'fs/promises';

class ProductManager {
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

    async getById(id) {
        try {
            const products = await this.getAll();
            return products.find(product => product.id === Number(id));
        } catch (error) {
            throw new Error('Error al obtener el producto');
        }
    }

    async saveAll(products) {
        try {
            await fs.writeFile(this.filePath, JSON.stringify(products, null, 2));
        } catch (error) {
            throw new Error('Error al guardar los productos');
        }
    }

    async addProduct(product) {
        try {
            const products = await this.getAll();

            const newProduct = {
                id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
                ...product,
                status: product.status ?? true,
            };

            products.push(newProduct);
            await this.saveAll(products);
            return newProduct;
        } catch (error) {
            throw new Error('Error al agregar el producto');
        }
    }

    async updateProduct(id, updates) {
        try {
            const products = await this.getAll();
            const index = products.findIndex(product => product.id === Number(id));

            if (index === -1) return null;

            const updatedProduct = { ...products[index], ...updates, id: products[index].id };
            products[index] = updatedProduct;

            await this.saveAll(products);
            return updatedProduct;
        } catch (error) {
            throw new Error('Error al actualizar el producto');
        }
    }

    async deleteProduct(id) {
        try {
            const products = await this.getAll();
            const filteredProducts = products.filter(product => product.id !== Number(id));

            if (filteredProducts.length === products.length) return false;

            await this.saveAll(filteredProducts);
            return true;
        } catch (error) {
            throw new Error('Error al eliminar el producto');
        }
    }
}

export default ProductManager;