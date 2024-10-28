import products from '../../data/products.json' assert {type: 'json'}

async function getProducts(request, reply) {
    const page = Number(request.query.page) || 1; 
    const limit = Number(request.query.limit) || 10;
    
    const productsData = paginateProducts(page, limit);

    const response = {
        page,
        limit,
        ...productsData
    }
    return response;
}

const paginateProducts = (page, limit) => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = products.slice(startIndex, endIndex);
    const totalItems = products.length;
    const totalPages = Math.ceil(totalItems / limit);

    return {
        totalItems,
        totalPages,
        products: paginatedProducts
    }
}

export {
    getProducts
}