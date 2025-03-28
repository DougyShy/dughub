import mongoose, { mongo } from "mongoose";

const grocerySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Name of the grocery item
  category: { type: String, required: true }, // Category (e.g., dairy, vegetables)
  price: { type: Number, required: true }, // Price of the item
  quantity: { type: Number, required: true }, // Quantity available
  description: { type: String }, // Optional description of the item
});

const Grocery = mongoose.model("Grocery", grocerySchema);

export default Grocery;
