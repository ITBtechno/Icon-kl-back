const mongoose = require("mongoose");
const { Schema } = mongoose;

const promocodesSchema = new Schema(
  {
    code: { type: String, required: true, unique: true },
    discount: { type: Number, required: true },
    expirationDate: { type: Date, required: true },
    expired: { type: Boolean, default: false },
    limit: { type: Number, default: 0 },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

promocodesSchema.pre("save", async function (next) {
  const usageCount = await mongoose.model("orders").countDocuments({
    promocodeId: this._id,
  });

  if (this.expirationDate && new Date() > this.expirationDate) {
    this.expired = true;
  } else if (this.limit > 0 && usageCount >= this.limit) {
    this.expired = true;
  } else {
    this.expired = false;
  }

  next();
});

const PromocodesModel = mongoose.model("promocodes", promocodesSchema);
module.exports = PromocodesModel;
