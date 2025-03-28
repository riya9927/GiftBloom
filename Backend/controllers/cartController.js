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

//remove from user cart
const removeFromCart = async (req, res) => {
    try {
        const { userId, itemId, option } = req.body;
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};

        // Check if item exists in cart
        if (!cartData[itemId] || !cartData[itemId][option]) {
            return res.json({ success: false, message: "Item not found in cart" });
        }

        // Remove the specific option from the item
        delete cartData[itemId][option];

        // If no options left for this item, remove the item altogether
        if (Object.keys(cartData[itemId]).length === 0) {
            delete cartData[itemId];
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { cartData },
            { new: true }
        );

        if (!updatedUser) {
            return res.json({ success: false, message: "Failed to update cart" });
        }

        res.json({ success: true, message: "Removed from Cart" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const getUserCart = async (req, res) => {
    try {
      const { userId } = req.body;
    //   console.log("Getting cart for userId:", userId);
      
      const userData = await userModel.findById(userId);
      if (!userData) {
        // console.log("User not found for ID:", userId);
        return res.json({ success: false, message: "User not found" });
      }
      
      const cartData = userData.cartData || {};
    //   console.log("Retrieved cart data:", cartData);
      
      res.json({ success: true, cartData });
    } catch (error) {
    //   console.log("Error in getUserCart:", error);
      res.json({ success: false, message: error.message });
    }
  }

export { addToCart, updateCart, getUserCart,removeFromCart }
