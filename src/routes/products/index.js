import {getProducts} from '../../handlers/products/index.js'


async function productRoutes(fastify, options) {
    fastify.get('/', {handler: getProducts})
}

export default productRoutes;