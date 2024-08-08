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

promocodesSchema.pre("save", function (next) {
  if (this.expirationDate) {
    this.expired = new Date() > this.expirationDate;
  }
  next();
});

const PromocodesModel = mongoose.model("promocodes", promocodesSchema);
module.exports = PromocodesModel;
