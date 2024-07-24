const express = require("express");
const {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
} = require("../controller/OrdersController.js");
const verifyAccess = require("../middleware/AuthMiddleware.js");

const OrdersRouter = express.Router();

OrdersRouter.get("/orders", verifyAccess(["Admin"]), getAllOrders);
OrdersRouter.get("/orders/:id", verifyAccess(["Admin","User"]), getOrderById);
OrdersRouter.post("/orders",  verifyAccess(["Admin", "User"]),createOrder);
OrdersRouter.delete("/orders/:id", verifyAccess(["Admin", "User"]), deleteOrder);

module.exports = { OrdersRouter };

