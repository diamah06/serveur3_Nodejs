class Controller {
    constructor() {}

    async paginate(req, results) {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const offset = (page - 1) * limit;

        const paginatedItems = results.slice(offset, offset + limit);
        const totalItems = results.length;
        const totalPages = Math.ceil(totalItems / limit);

        return {
            prevQuery: page > 1 ? `?page=${page - 1}&limit=${limit}` : null,
            nextQuery: page < totalPages ? `?page=${page + 1}&limit=${limit}` : null,
            nextPage: page < totalPages ? page + 1 : null,
            totalPages,
            currentPage: page,
            totalItems,
            items: paginatedItems,
        };
    }
}

module.exports = Controller;
