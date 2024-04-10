const Product = require("../models/productModel");
const Joi = require("joi");

const createProductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().required(),
  price: Joi.number().required(),
});

exports.createProduct = async (req, res, next) => {
  const { error } = createProductSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const { name, description, image, price } = req.body;

    const product = await Product.create({
      name: name,
      description: description,
      image: image,
      price: price,
    });

    res.status(201).send({
      productData: product,
      message: "product created succesfully",
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(400).send({
      messege: error.messege,
    });
  }
};

exports.listAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    if (!products || products.length === 0) {
      return res.status(404).send({ message: "No products found" });
    }
    return res.status(200).send({
      messege: "successfully listed all products",
      productData: products,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: "Internal server error" });
  }
};
