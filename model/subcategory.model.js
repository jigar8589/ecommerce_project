const mongoose = require("mongoose");
const category = require("./categoty.model");

subCategorySchema = new mongoose.Schema({
  subCategoryName: {
    type: String,
    required: true,
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
});

const subCategory = mongoose.model("subCategoty", subCategorySchema);
