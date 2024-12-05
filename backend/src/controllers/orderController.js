import { asyncHandler } from "../utils/asyncHandler.js";
import { Order } from "../models/orderSchema.js";
import { Cart } from "../models/cartSchema.js";
import { User } from "../models/userSchema.js";
const getOrders = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const rets = await Order.findOne({ userId }).populate(
    "orders.items.productId"
  );
  // await Order.deleteMany({ userId });
  res.status(200).json({ message: "Fetch successful", rets });
});

const addOrder = asyncHandler(async (req, res) => {
  const { userId, scheduleTime, scheduleDate } = req.body;
  const cart = await Cart.findOne({ userId });
  console.log(scheduleTime.toString());
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
    order.orders.push({
      items,
      totalAmount,
      status: "Pending",
      scheduleTime: scheduleTime.toString()
        ? scheduleTime.toString()
        : "Immediate",
      scheduleDate: scheduleDate || Date.now(),
    });
  } else {
    order = new Order({
      userId,
      orders: [
        {
          items,
          totalAmount,
          status: "Pending",
          scheduleTime: scheduleTime.toString()
            ? scheduleTime.toString()
            : "Immediate",
          scheduleDate: scheduleDate || Date.now(),
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

const updateOrderStatus = asyncHandler(async (req, res) => {
  const orderId = req.params.id;
  const { itemId, newStatus } = req.body;
  const order = await Order.findById(orderId);
  for (const el of order.orders) {
    if (el._id.toString() === itemId) {
      el.status = newStatus;
    }
  }
  await order.save();

  return res.status(200).json({ message: "good", order });
});

const getAllOrders = asyncHandler(async (req, res) => {
  const listOfAllOrders = await Order.find({}).populate(
    "orders.items.productId"
  );
  return res.status(200).json({
    message: "All products fetched successfully",
    data: listOfAllOrders,
  });
});

const deleteOrder = asyncHandler(async (req, res) => {
  const orderId = req.params.id;
  const { itemId } = req.body;
  const order = await Order.findById(orderId);
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  const itemIndex = order.orders.findIndex(
    (el) => el._id.toString() === itemId
  );
  if (itemIndex === -1) {
    return res.status(404).json({ message: "Item not found in order" });
  }

  order.orders.splice(itemIndex, 1);
  await order.save();

  return res.status(200).json({ message: "Item deleted successfully", order });
});

export { getOrders, addOrder, getAllOrders, updateOrderStatus, deleteOrder };
