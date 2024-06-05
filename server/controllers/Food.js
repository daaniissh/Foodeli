import mongoose from "mongoose";
import Food from "../models/Food.js";

import { createError } from "../error.js";

export const addProduct = async (req, res, next) => {
  try {
    const foodData = req.body;
    if (!Array.isArray(foodData)) {
      return next(
        createError(400, "Invalid request. Expected an array of foods")
      );
    }
    let createdfoods = [];
    for (const foodInfo of foodData) {
      const { name, desc, img, price, ingredients ,categories } = foodInfo;
      const product = new Food({
        name,
        desc,
        img,
        price,
        ingredients,
        categories,
      });
      const createdFoods = await product.save();
      createdfoods.push(createdFoods);
    }
    return res.json({ message: "product added successfully", createdfoods });
  } catch (error) {
    next(error);
  }
};

export const getFoodItems = async (req, res, next) => {
  try {
    let { categories, minPrice, maxPrice, sizes, search } = req.query;
    console.log(search)
    sizes = sizes?.split(",");
    categories = categories?.split(",");
    console.log(req.query)
    const filter = {};

    if (categories !== "" && Array.isArray(categories)) {
      filter.categories = { $in: categories }; // Match products in any of the specified categories
    }

    if (minPrice || maxPrice) {
      filter["price.org"] = {};
      if (minPrice) {
        filter["price.org"]["$gte"] = parseFloat(minPrice);
      }
      if (maxPrice) {
        filter["price.org"]["$lte"] = parseFloat(maxPrice);
      }
    }

    if (sizes && Array.isArray(sizes)) {
      filter.sizes = { $in: sizes }; // Match products in any of the specified sizes
    }

    if (search) {
      filter.$or = [
        { name: { $regex: new RegExp(search, "i") } }, // Case-insensitive title search
        { desc: { $regex: new RegExp(search, "i") } }, // Case-insensitive description search
      ];
    }
   
    const products = await Food.find(filter);
    return res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};
export const getFoodById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return next(createError(400, "Invalid ID"));
    }
    const food = await Food.findById(id);
    if (!food) {
      return next(createError(400, "Food not found"));
    }
    return res.json(food);
  } catch (error) {
    next(error);
  }
};
