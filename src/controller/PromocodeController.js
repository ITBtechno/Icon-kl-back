const OrdersModel = require("../model/OrderModel.js");
const PromocodesModel = require("../model/PromocodeModel.js");

const createPromocode = async (req, res) => {
  try {
    const { code, discount, expirationDate, limit } = req.body;
    const promocode = new PromocodesModel({
      code,
      discount,
      expirationDate,
      limit,
    });
    const savedPromocode = await promocode.save();
    res.status(201).json(savedPromocode);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllPromocodes = async (req, res) => {
  try {
    const promocodes = await PromocodesModel.find();
    res.status(200).json(promocodes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPromocodeById = async (req, res) => {
  try {
    const promocode = await PromocodesModel.findById(req.params.id);
    if (!promocode) {
      return res.status(404).json({ message: "Promocode not found" });
    }
    res.status(200).json(promocode);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePromocode = async (req, res) => {
  try {
    const { code, discount, expirationDate, limit } = req.body;
    const updatedPromocode = await PromocodesModel.findByIdAndUpdate(
      req.params.id,
      { code, discount, expirationDate, limit },
      { new: true, runValidators: true }
    );
    if (!updatedPromocode) {
      return res.status(404).json({ message: "Promocode not found" });
    }
    res.status(200).json(updatedPromocode);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deletePromocode = async (req, res) => {
  try {
    const deletedPromocode = await PromocodesModel.findByIdAndDelete(
      req.params.id
    );
    if (!deletedPromocode) {
      return res.status(404).json({ message: "Promocode not found" });
    }
    res.status(200).json({ message: "Promocode deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const validatePromocode = async (req, res) => {
  try {
    const { code } = req.body;
    const promocode = await PromocodesModel.findOne({ code });

    if (!promocode) {
      return res.status(404).json({ message: "Promocode not found" });
    }

    if (promocode.expired) {
      return res.status(400).json({ message: "Promocode is expired" });
    }

    const usageCount = await OrdersModel.countDocuments({
      promocodeId: promocode._id,
    });

    if (promocode.limit > 0 && usageCount >= promocode.limit) {
      return res
        .status(400)
        .json({ message: "Promocode usage limit has been reached" });
    }
    res.status(200).json({ message: "Promocode is valid", promocode });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createPromocode,
  getAllPromocodes,
  getPromocodeById,
  updatePromocode,
  deletePromocode,
  validatePromocode,
};
