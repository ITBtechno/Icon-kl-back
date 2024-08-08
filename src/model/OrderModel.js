const mongoose = require("mongoose");
const { Schema } = mongoose;

const ordersSchema = new Schema(
  {
    amount: { type: Number, required: true },
    status: { type: String, required: true, default: "Pending" },
    promocodeId: { type: Schema.Types.ObjectId, ref: "promocodes" },
    paymentMethod: { type: String, required: true },
    items: [
      {
        itemId: { type: Schema.Types.ObjectId, ref: "items" },
        itemCount: { type: Number, required: true },
      },
    ],
    orderByUserId: { type: Schema.Types.ObjectId, ref: "users" },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

const OrdersModel = mongoose.model("orders", ordersSchema);
module.exports = OrdersModel;
