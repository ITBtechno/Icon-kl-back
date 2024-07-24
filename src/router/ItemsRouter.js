const express = require("express");
const {
  createItem,
  deleteItem,
  getAllItems,
  getItemById,
  getItemsWithCategory,
  updateItem,
} = require("../controller/ItemsController.js");
const { upload } = require("../middleware/UploadMiddleware.js");
const verifyAccess = require("../middleware/AuthMiddleware.js");

const ItemsRouter = express.Router();

ItemsRouter.get("/items", getAllItems);
ItemsRouter.get("/items/:id",  getItemById);
ItemsRouter.get("/items-with-category", getItemsWithCategory);
ItemsRouter.post("/items", upload.single("image"),verifyAccess(["Admin"]),createItem);
ItemsRouter.put("/items/:id", upload.single("image"),verifyAccess(["Admin"]), updateItem);
ItemsRouter.delete("/items/:id", verifyAccess(["Admin"]), deleteItem);

module.exports = { ItemsRouter };

