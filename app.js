import express from 'express';
import productRoutes from './src/routes/products.routes.js';
import cartRoutes from './src/routes/carts.routes.js';

const app = express();
const PORT = 8080;

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});