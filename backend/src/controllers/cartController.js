import { Cart } from "../models/cartSchema.js";
import { Product } from "../models/productSchema.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addItemToCart = asyncHandler(async (req, res) => {
  const { userId, quantity, item: prod } = req.body;
  let productId = prod._id;
  const product = await Product.findById(productId);
  if (quantity > product.stock) {
    return res
      .status(400)
      .json({ message: "Not enough stock available", id: product._id });
  }

  const productPrice = product.price;
  const totalPrice = productPrice * quantity;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({
      userId,
      items: [
        {
          productId: product._id,
          quantity,
          totalPrice,
        },
      ],
    });
  } else {
    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === product._id.toString()
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
      cart.items[existingItemIndex].totalPrice =
        cart.items[existingItemIndex].quantity * productPrice;
    } else {
      cart.items.push({
        productId: product._id,
        quantity,
        totalPrice,
      });
    }
  }
  await cart.save();

  // Respond with the updated cart and product id
  res.status(200).json({ cart: cart, id: productId });
});

const getCart = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const cart = await Cart.findOne({ userId }).populate("items.productId");
  res.status(200).json(cart);
});

const updateItemQuantity = asyncHandler(async (req, res) => {
  const { userId, productId, quantity } = req.body;
  const cart = await Cart.findOne({ userId });
  if (!cart) {
    res.status(404).json({ message: "Cart not found" });
    return;
  }
  const product = await Product.findById(productId);
  if (!product) {
    res.status(404).json({ message: "Product not found" });
    return;
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );
  let curr = cart.items[itemIndex].quantity;
  if (curr + quantity > product.stock) {
    return res.status(400).json({
      message: "Not Enough Stock Available",
    });
  }
  if (curr == 1 && quantity === -1) {
    return res.status(400).json({
      message: "Less than zero",
    });
  }

  const productPrice = product.price;

  if (itemIndex > -1) {
    curr = quantity + curr;
    cart.items[itemIndex].totalPrice = curr * productPrice;
    cart.items[itemIndex].quantity = curr;
  } else {
    return res.status(404).json({ message: "Item not found in cart" });
  }
  const ret = curr;
  await cart.save();
  return res.status(200).json({ ret });
});

const removeItemFromCart = asyncHandler(async (req, res) => {
  const { userId, productId } = req.body;

  const cart = await Cart.findOne({ userId });
  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  // Check if the item exists in the cart
  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (itemIndex > -1) {
    // Remove the item using $pull for atomic updates
    await Cart.updateOne({ userId }, { $pull: { items: { productId } } });

    // If the cart is empty after removal, consider deleting it
    const updatedCart = await Cart.findOne({ userId });
    if (updatedCart.items.length === 0) {
      await Cart.deleteOne({ userId });
      return res.status(200).json({ message: "Cart is now empty", items: [] });
    }

    // Return the updated cart
    return res
      .status(200)
      .json({ message: "Item removed successfully", cart: updatedCart });
  }

  res.status(404).json({ message: "Item not found in cart" });
});

const getItems = asyncHandler(async (req, res) => {});

export { addItemToCart, getCart, updateItemQuantity, removeItemFromCart };
