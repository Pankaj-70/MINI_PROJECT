import { Cart } from "../models/cartSchema.js";
import { Product } from "../models/productSchema.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addItemToCart = asyncHandler(async (req, res) => {
  const { userId, quantity, item: prod } = req.body;
  let productId = prod._id;
  let product = await Product.findById(productId);
  console.log("Enter");
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

  if (quantity > product.stock) {
    res.status(400).json({ message: "Not enough stock available" });
    return;
  }

  const productPrice = product.price;
  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity = quantity + cart.items[itemIndex].quantity;
    cart.items[itemIndex].totalPrice = quantity * productPrice;
  } else {
    res.status(404).json({ message: "Item not found in cart" });
    return;
  }
  const ret = cart.items[itemIndex].quantity;
  await cart.save();
  res.status(200).json({ ret });
});

const removeItemFromCart = asyncHandler(async (req, res) => {
  const { userId, productId } = req.body;

  const cart = await Cart.findOne({ userId });
  if (!cart) {
    res.status(404).json({ message: "Cart not found" });
    return;
  }
  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (itemIndex > -1) {
    cart.items.splice(itemIndex, 1);
  } else {
    res.status(404).json({ message: "Item not found in cart" });
    return;
  }

  await cart.save();
  res.status(200).json(cart);
});

const getItems = asyncHandler(async (req, res) => {});

export { addItemToCart, getCart, updateItemQuantity, removeItemFromCart };
