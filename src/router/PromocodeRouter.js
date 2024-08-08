const express = require("express");
const {
  createPromocode,
  getAllPromocodes,
  getPromocodeById,
  updatePromocode,
  deletePromocode,
  validatePromocode,
} = require("../controller/PromocodeController");
const verifyAccess = require("../middleware/AuthMiddleware");
const PromocodesRouter = express.Router();

PromocodesRouter.post("/promocodes", verifyAccess(["Admin"]), createPromocode);
PromocodesRouter.get("/promocodes", verifyAccess(["Admin"]), getAllPromocodes);
PromocodesRouter.get("/promocodes/:id",verifyAccess(["Admin"]), getPromocodeById);
PromocodesRouter.put("/promocodes/:id",verifyAccess(["Admin"]),updatePromocode);
PromocodesRouter.delete("/promocodes/:id",verifyAccess(["Admin"]),deletePromocode);
PromocodesRouter.post("/promocodes/validate",verifyAccess(["Admin", "User"]),validatePromocode);

module.exports = { PromocodesRouter };
