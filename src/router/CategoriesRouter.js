const express = require("express");
const {
  getAllCategories,
  getCategoryById,
  createCategories,
  updateCategory,
  deleteCategory,
  getCategoriesWithItems,
} = require("../controller/CategoriesController.js");
const verifyAccess = require("../middleware/AuthMiddleware.js");

const CategoriesRouter = express.Router();

CategoriesRouter.get("/categories", getAllCategories);
CategoriesRouter.get("/categories-with-items", getCategoriesWithItems);
CategoriesRouter.get("/categories/:id", getCategoryById);
CategoriesRouter.post("/categories", verifyAccess(["Admin"]), createCategories);
CategoriesRouter.put("/categories/:id", verifyAccess(["Admin"]), updateCategory);
CategoriesRouter.delete("/categories/:id", verifyAccess(["Admin"]), deleteCategory);

module.exports = { CategoriesRouter };
