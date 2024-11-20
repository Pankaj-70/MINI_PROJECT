import { Cart } from "../models/cartSchema.js";
import { Product } from "../models/productSchema.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addItemToCart = asyncHandler(async (req, res) => {
  const { userId, quantity, item: prod } = req.body;
  let productId = prod.id || null; // Ensure prod.id is used if available
  let product = await Product.findById(productId);

  // If product is not found, create a new one with the provided prod data
  if (!product) {
    if (!prod || !prod.name || !prod.price || !prod.img) {
      return res.status(400).json({ message: "Product data is incomplete" });
    }

    // Create a new product and get the id
    product = await Product.create({
      name: prod.name,
      price: prod.price,
      img: prod.img,
    });

    // Add the product's id to the response object
    productId = product._id;
  }

  // Check for stock availability
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
  const { userId } = req.params;

  const cart = await Cart.findOne({ userId }).populate("items.productId");
  if (!cart) {
    res.status(404).json({ message: "Cart not found" });
    return;
  }

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
    cart.items[itemIndex].quantity = quantity;
    cart.items[itemIndex].totalPrice = quantity * productPrice;
  } else {
    res.status(404).json({ message: "Item not found in cart" });
    return;
  }

  await cart.save();
  res.status(200).json(cart);
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

export { addItemToCart, getCart, updateItemQuantity, removeItemFromCart };
