const express = require("express");
const multer = require("multer");
const path = require("path");
const auth = require("../middlewere/auth");
const productrouter = express.Router();

const {
  createProduct,
  updateproduct,
  deleteProductControl,
  allProducts,
  getProductcontroler,
} = require("../controller/product.control");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "../public/uploads"));
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

productrouter.post("/", auth, upload.array("images"), createProduct);
productrouter.put("/:id", auth, upload.array("images"),updateproduct);
productrouter.delete("/:id",auth, deleteProductControl);
productrouter.get("/", auth,allProducts);
productrouter.get("/:id",auth, getProductcontroler);

module.exports = productrouter;
