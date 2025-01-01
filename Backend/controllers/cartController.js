import userModel from "../models/userModel.js";

//add products to user cart
const addToCart = async (req, res) => {
    try {
        const { userId, itemId, option } = req.body;
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};

        if (cartData[itemId]) {
            if (cartData[itemId][option]) {
                cartData[itemId][option] += 1;
            } else {
                cartData[itemId][option] = 1;
            }
        } else {
            cartData[itemId] = {
                [option]: 1
            };
        }

        // Save the updated cart data to the database
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { cartData },
            { new: true }
        );

        if (!updatedUser) {
            return res.json({ success: false, message: "Failed to update cart" });
        }

        res.json({ success: true, message: "Added to Cart" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

//update user cart
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, option, quantity } = req.body;
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};
        
        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }
        
        cartData[itemId][option] = quantity;

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { cartData },
            { new: true }
        );

        if (!updatedUser) {
            return res.json({ success: false, message: "Failed to update cart" });
        }

        res.json({ success: true, message: "Cart Updated" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

//get user cart
const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body;
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        const cartData = userData.cartData || {};
        res.json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { addToCart, updateCart, getUserCart }