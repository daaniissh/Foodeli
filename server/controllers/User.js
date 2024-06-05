import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createError } from "../error.js";
import User from "../models/user.js";
import Order from "../models/Orders.js";
dotenv.config();
export const UserRegister = async (req, res, next) => {
  try {
    const { name, email, password, img } = req.body;
    const isExist = await User.findOne({ email }).exec();
    if (isExist) {
      return next(createError(400, "Email already taken"));
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      img,
    });
    const createdUser = await user.save();
    console.log(createdUser._id,"====id")
    const token = jwt.sign({ id: createdUser._id }, process.env.JWT, {
      expiresIn: "20 years",
    });
    return res.status(201).json({ token, user });
  } catch (error) {
    return next(error);
  }
};
export const UserLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return next(createError(400, "Email is not found"));
    }

    const isPasswordIsCorrect = await bcrypt.compareSync(
      password,
      user.password
    );
    if (!isPasswordIsCorrect) {
      return next(createError(403, "Incorrect password/email"));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT, {
      expiresIn: "20 years",
    });
    return res.status(200).json({ token, user });
  } catch (err) {
    return next(err);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const userJWT = req.user;
    console.log(userJWT)
    console.log("User JWT:", userJWT); // Debugging

    const user = await User.findById(userJWT.id);
    if (!user) {
      console.error("User not found with ID:", userJWT.id); // Debugging
      return next(createError(404, "User not found"));
    }

    // Ensure cart is initialized
    if (!user.cart) {
      user.cart = [];
    }

    const existingCartItemIndex = user.cart.findIndex((item) =>
      item?.product?.equals(productId)
    );

    if (existingCartItemIndex !== -1) {
      // Product is already in the cart, update the quantity
      user.cart[existingCartItemIndex].quantity += quantity;
    } else {
      // Product is not in the cart, add it
      user.cart.push({ product: productId, quantity });
    }

    await user.save();

    return res.status(200).json({ message: "Product added to cart successfully", user });
  } catch (err) {
    next(err);
  }
};

export const removeFromCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const userJWT = req.user;
    console.log("User JWT:", userJWT); // Debugging

    const user = await User.findById(userJWT.id);
    if (!user) {
      console.error("User not found with ID:", userJWT.id); // Debugging
      return next(createError(404, "User not found"));
    }

    // Ensure cart is initialized
    if (!user.cart) {
      user.cart = [];
    }

    const productIndex = user.cart.findIndex((item) =>
      item.product.equals(productId)
    );

    if (productIndex !== -1) {
      if (quantity && quantity > 0) {
        user.cart[productIndex].quantity -= quantity;
        if (user.cart[productIndex].quantity <= 0) {
          user.cart.splice(productIndex, 1);
        }
      } else {
        user.cart.splice(productIndex, 1);
      }

      await user.save();

      return res.status(200).json({ message: "Product quantity updated in cart", user });
    } else {
      return next(createError(404, "Product not found in cart"));
    }
  } catch (error) {
    next(error);
  }
};

export const getAllCartItems = async (req, res, next) => {
  try {
    const userJWT = req.user;
    console.log("User JWT:", userJWT); // Debugging

    const user = await User.findById(userJWT.id).populate({
      path: "cart.product",
      model: "Food",
    });

    if (!user) {
      console.error("User not found with ID:", userJWT.id); // Debugging
      return next(createError(404, "User not found"));
    }

    const cartItems = user.cart || [];
    return res.json(cartItems);
  } catch (error) {
    next(error);
  }
};

export const placeOrder = async (req, res, next) => {
  try {
    const { totalAmount, products, address } = req.body;
    const userJWT = req.user;
    const user = await User.findById(userJWT.id);

    const order = new Order({
      products,
      user: user._id,
      total_amount: totalAmount,
      address,
    });
    order.save();
    user.cart = [];
    user.save();
    return res.json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ user: userId })
      .populate("products.product")
      .exec();
    const order = await Order.find({ user: userId }).select("-products");
    if (!orders) {
      return next(new Error("User not found"));
    }

    // Extract products from orders
    const products = orders.reduce((acc, order) => {
      acc.push(...order.products);
      return acc;
    }, []);

    res.json(orders);
  } catch (error) {
    next(error);
  }
};

export const removeFromFavourites = async (req, res, next) => {
  try {
    console.log(req.body);
    const { productId } = req.body;
    const userJWT = req.user;
    const user = await User.findById(userJWT.id);
    user.favourites = user.favourites.filter((item) => !item.equals(productId));
    user.save();
    res.json({
      message: "Product removed from favourites successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const addToFavourites = async (req, res, next) => {
  try {
    const { productId } = req.body;

    const userJWT = req.user;
    const user = await User.findById(userJWT.id);

    if (!user.favourites.includes(productId)) {
      user.favourites.push(productId);
      await user.save();
    }
    return res.json({
      message: "Product added to favourites successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllFavourites = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate("favourites").exec();
    if (!user) next(404, "User not found");
    const all = user.favourites;
    res.json(all);
  } catch (error) {
    next(error);
  }
};
export const ProfileUpdate = async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log(req.body)
    const token =  req.headers['authorization'].split(' ')[1]
    const { name, email, img } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { name, email, img },
      { new: true, runValidators: true }
    );
    if (!user) next(404, "User not found");

    res.json({token,user});
  } catch (error) {
    next(error);
  }
};
