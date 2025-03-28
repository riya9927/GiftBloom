import userModel from "../models/userModel.js";
import mongoose from "mongoose";

// Add product to wishlist
const addToWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ success: false, message: "Invalid product ID format" });
    }
    
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    
    const wishlist = user.wishlist || [];
    
    const productObjectId = new mongoose.Types.ObjectId(productId);
    const exists = wishlist.some(id => id.equals(productObjectId));
    
    if (exists) {
      return res.status(200).json({ success: true, message: "Item already in wishlist" });
    }
    
    wishlist.push(productObjectId);
    
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { wishlist },
      { new: true }
    ).populate('wishlist');
    
    if (!updatedUser) {
      return res.status(500).json({ success: false, message: "Failed to update wishlist" });
    }
    
    res.status(200).json({ 
      success: true, 
      message: "Added to Wishlist",
      wishlist: updatedUser.wishlist
    });
  } catch (error) {
    console.error("Error adding to wishlist:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ success: false, message: "Invalid product ID format" });
    }
    
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    
    const productObjectId = new mongoose.Types.ObjectId(productId);
    const wishlist = user.wishlist || [];
    const updatedWishlist = wishlist.filter(id => !id.equals(productObjectId));
    
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { wishlist: updatedWishlist },
      { new: true }
    ).populate('wishlist'); 
    
    if (!updatedUser) {
      return res.status(500).json({ success: false, message: "Failed to update wishlist" });
    }
    
    res.status(200).json({ 
      success: true, 
      message: "Removed from Wishlist",
      wishlist: updatedUser.wishlist 
    });
  } catch (error) {
    console.error("Error removing from wishlist:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUserWishlist = async (req, res) => {
  try {
    const userId = req.params.userId || req.query.userId;
    
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }
    
    const user = await userModel.findById(userId).populate('wishlist');
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    
    const wishlist = user.wishlist || [];
    res.status(200).json({ success: true, wishlist });
  } catch (error) {
    console.error("Error fetching wishlist:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addToWishlist, removeFromWishlist, getUserWishlist };