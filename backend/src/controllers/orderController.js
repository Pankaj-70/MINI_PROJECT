import { asyncHandler } from "../utils/asyncHandler.js";
import { Order } from "../models/orderSchema.js";
import { Cart } from "../models/cartSchema.js";

const getOrders = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const rets = await Order.findOne({ userId }).populate(
    "orders.items.productId"
  );
  // await Order.deleteMany({ userId });
  res.status(200).json({ message: "Fetch successful", rets });
});

const addOrder = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const cart = await Cart.findOne({ userId });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  let totalAmount = 0;
  const items = [];

  for (let item of cart.items) {
    const product = item.productId;
    const totalPrice = item.totalPrice;

    items.push({
      productId: product,
      quantity: item.quantity,
      totalPrice: totalPrice,
    });

    totalAmount += totalPrice;
  }

  let order = await Order.findOne({ userId });
  totalAmount = (totalAmount + totalAmount * 0.18 + 50 + 20).toFixed(2);
  if (order) {
    order.orders.unshift({
      items,
      totalAmount,
      status: "Pending",
    });
  } else {
    order = new Order({
      userId,
      orders: [
        {
          items,
          totalAmount,
          status: "Pending",
        },
      ],
    });
  }

  await order.save();
  await Cart.deleteOne({ userId });

  return res.status(200).json({
    message: "Order placed successfully",
    order,
  });
});

const deleteOrder = asyncHandler(async (req, res) => {});

export { getOrders, addOrder };
