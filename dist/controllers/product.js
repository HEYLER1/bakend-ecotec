"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = void 0;
const product_1 = require("../models/product");
const getProducts = async (req, res) => {
    const listProducts = await product_1.Product.findAll();
    res.json(listProducts);
};
exports.getProducts = getProducts;
//# sourceMappingURL=product.js.map