// import axios from 'axios';
// import dotenv from 'dotenv';
// dotenv.config(); // Add this to load the environment variables

// // Function to add a product
// const addProduct = async (req, res) => {
//     try {
//         const { name, description, price, category, subCategory, option, bestseller } = req.body;

//         // Validation for required fields
//         if (!name || !price || !category) {
//             return res.status(400).json({ success: false, message: "Name, Price, and Category are required fields." });
//         }

//         const image1 = req.files.image1 && req.files.image1[0];
//         const image2 = req.files.image2 && req.files.image2[0];
//         const image3 = req.files.image3 && req.files.image3[0];
//         const image4 = req.files.image4 && req.files.image4[0];

//         const images = [image1, image2, image3, image4].filter(item => item !== undefined);

//         // Upload images to ImgBB
//         const imagesUrl = await Promise.all(
//             images.map(async (item) => {
//                 const formData = new FormData();
//                 formData.append('image', item.path); // Append the image file

//                 // Send POST request to ImgBB API using the provided API key
//                 const result = await axios.post(
//                     `https://api.imgbb.com/1/upload?key=a34e447a431749a7f2dd6303a7220493`,  // Replace with actual API key
//                     formData, 
//                     {
//                         headers: { 'Content-Type': 'multipart/form-data' }
//                     }
//                 );
//                 console.log("ImgBB Response: ", result.data); // Log the response from ImgBB
//                 return result.data.data.url; // ImgBB returns the image URL in 'data.url'
//             })
//         );

//         const productData = {
//             name,
//             description,
//             category,
//             price: Number(price),
//             subCategory,
//             bestseller: bestseller == "true" ? true : false,
//             option: JSON.parse(option),
//             image: imagesUrl,
//             date: Date.now()
//         };

//         const product = new productModel(productData);
//         await product.save();

//         res.status(201).json({ success: true, message: "Product added successfully" });
//     } catch (error) {
//         console.error("Error: ", error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };


// // List products
// const listProduct = async (req, res) => {
//     try {
//         const products = await productModel.find({});
//         res.json({ success: true, products });
//     } catch (error) {
//         console.error(error);
//         res.json({ success: false, message: error.message });
//     }
// };

// // Remove a product
// const removeProduct = async (req, res) => {
//     try {
//         const productId = req.body.id;
//         const product = await productModel.findByIdAndDelete(productId);

//         if (!product) {
//             return res.status(404).json({ success: false, message: "Product not found" });
//         }

//         res.json({ success: true, message: "Product removed successfully" });
//     } catch (error) {
//         console.error(error);
//         res.json({ success: false, message: error.message });
//     }
// };

// // Get a single product by ID
// const singleProduct = async (req, res) => {
//     try {
//         const productId = req.params.id;
//         const product = await productModel.findById(productId);

//         if (!product) {
//             return res.status(404).json({ success: false, message: "Product not found" });
//         }

//         res.json({ success: true, product });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// export { addProduct, listProduct, removeProduct, singleProduct };



import axios from 'axios';
import dotenv from 'dotenv';
import FormData from 'form-data';
import fs from 'fs';
import productModel from '../models/productModel.js';
import orderModel from '../models/orderModel.js';

dotenv.config();

const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, option, bestseller } = req.body;

    // Validation
    if (!name || !price || !category) {
      console.error("Validation Error: Missing required fields.");
      return res.status(400).json({
        success: false,
        message: "Name, Price, and Category are required fields.",
      });
    }

    // console.log("Request Body:", req.body);

    const images = [];
    for (let i = 1; i <= 4; i++) {
      const image = req.files?.[`image${i}`]?.[0];
      if (image) {
        images.push(image);
      }
    }

    // console.log("Uploaded Images:", images);

    const imagesUrl = await Promise.all(
      images.map(async (image) => {
        try {
          const formData = new FormData();
          formData.append("image", fs.createReadStream(image.path));

          const result = await axios.post(
            `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
            formData,
            {
              headers: formData.getHeaders(),
              timeout: 15000, // 15-second timeout
            }
          );

          // Clean up the temporary file
          fs.unlinkSync(image.path);

          if (result.data.success) {
            return result.data.data.url;
          } else {
            throw new Error("Image upload failed");
          }
        } catch (err) {
          console.error("Image upload error:", err.message);
          throw new Error(`Image upload failed: ${err.message}`);
        }
      })
    );

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      bestseller: bestseller === "true" || bestseller === true,
      option: option ? JSON.parse(option) : [],
      image: imagesUrl,
      date: Date.now(),
    };

    // console.log("Final Product Data:", productData);

    const product = new productModel(productData);
    await product.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully",
    });
  } catch (error) {
    console.error("Error in addProduct:", error.message);
    res.status(500).json({
      success: false,
      message: error.message || "Server error. Please try again later.",
    });
  }
};



// List products
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    if (!products.length) {
      return res.status(404).json({ success: false, message: "No products found" });
    }
    res.json({ success: true, products });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

// Remove a product
const removeProduct = async (req, res) => {
    try {
        const productId = req.body.id;
        const product = await productModel.findByIdAndDelete(productId);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, message: "Product removed successfully" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// Get a single product by ID
const singleProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await productModel.findById(productId);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateProduct = async (req, res) => {
  try {
      const { id, name, description, price, category, subCategory, option, bestseller } = req.body;

      if (!id) {
          return res.status(400).json({
              success: false,
              message: "Product ID is required for update."
          });
      }

      const images = [];
      for (let i = 1; i <= 4; i++) {
          const image = req.files?.[`image${i}`]?.[0];
          if (image) {
              const formData = new FormData();
              formData.append("image", fs.createReadStream(image.path));

              const result = await axios.post(
                  `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
                  formData,
                  {
                      headers: formData.getHeaders(),
                      timeout: 15000,
                  }
              );

              fs.unlinkSync(image.path);

              if (result.data.success) {
                  images.push(result.data.data.url);
              } else {
                  throw new Error("Image upload failed");
              }
          }
      }

      const updatedData = {
        ...(name && { name }),
        ...(description && { description }),
        ...(price && { price: Number(price) }), // Ensure the price is a number
        ...(category && { category }),
        ...(subCategory && { subCategory }),
        ...(option && { option: JSON.parse(option) }),
        ...(typeof bestseller !== "undefined" && { bestseller: bestseller === "true" || bestseller === true }),
        ...(images.length > 0 && { image: images }),
      };
      

      const product = await productModel.findByIdAndUpdate(id, updatedData, { new: true });

      if (!product) {
          return res.status(404).json({
              success: false,
              message: "Product not found",
          });
      }

      res.json({
          success: true,
          message: "Product updated successfully",
          product,
      });
  } catch (error) {
      console.error("Error in updateProduct:", error.message);
      res.status(500).json({
          success: false,
          message: error.message || "Server error. Please try again later.",
      });
  }
};



// Get product stats (total products and total orders)
const getProductStats = async (req, res) => {
  try {
    const totalProducts = await productModel.countDocuments({});
    const totalOrders = await orderModel.countDocuments({}); 

    res.json({
      success: true,
      totalProducts,
      totalOrders,
    });
  } catch (error) {
    console.error("Error fetching stats:", error.message);
    res.status(500).json({
      success: false,
      message: error.message || "Server error. Please try again later.",
    });
  }
};




export { addProduct, listProduct, removeProduct, singleProduct,updateProduct,getProductStats };

