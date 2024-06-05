import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    img: {
      type: String,
      default: null,
    },
    favourites: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Food",
      default: [],
    },
    Orders: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Orders"
    },
    cart: {
      type: [
        {
          product: {
            type: mongoose.Schema.ObjectId,
            ref: "Food",
            required: true,
          },
          quantity: { type: Number, default: 1 },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
