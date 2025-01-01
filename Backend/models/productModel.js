// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     description: { type: String, required: true },
//     price: { type: Number, required: true },
//     image: { type: Array, required: true },
//     category: { type: String, required: true },
//     subCategory: { type: String, required: true },
//     option: { type: Array, required: true },
//     date: { type: Number, required: true },
//     bestseller: { type: Boolean }
// });

// const productModel = mongoose.models.product || mongoose.model("product", productSchema); // Fixed model initialization

// export default productModel;

// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     description: { type: String, required: true },
//     price: { type: Number, required: true },
//     image: { type: Array, required: true },
//     category: { type: String, required: true },
//     subCategory: { type: String, required: true },
//     option: { type: Array, required: true },
//     date: { type: Number, required: true },
//     bestseller: { type: Boolean }
// });

// const productModel = mongoose.models.product || mongoose.model("product", productSchema);

// export default productModel;


import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: Array, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    option: { type: Array, required: true },
    date: { type: Number, required: true },
    bestseller: { type: Boolean }
});

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
