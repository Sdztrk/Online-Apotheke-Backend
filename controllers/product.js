const PharmaceuticalProduct = require('../models/products');

// @URL     GET /api/products
exports.list = async (req, res) => {
  const products = await PharmaceuticalProduct.find();
  res.status(200).json({ success: true, data: products });
};

// @URL     GET /api/products/:id
exports.read = async (req, res) => {
  const product = await PharmaceuticalProduct.findById(req.params.id);
  if (product) {
    res.status(200).json({ success: true, data: product });
  } else {
    res.status(404).json({ success: false, message: 'Product not found' });
  }
};

// @URL     POST /api/products
exports.create = async (req, res) => {
  // add the image to the req.body
  if(req?.file)
  req.body.image = req.file.originalname;
  const product = await PharmaceuticalProduct.create(req.body);
  res.status(201).json({ success: true, data: product });
};

// @URL     PUT /api/products/:id
exports.update = async (req, res) => {
  const product = await PharmaceuticalProduct.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  if (product) {
    res.status(202).json({ success: true, data: product });
  } else {
    res.status(404).json({ success: false, message: 'Product not found' });
  }
};

// @URL     DELETE /api/products/:id
exports.delete = async (req, res) => {
  const product = await PharmaceuticalProduct.findById(req.params.id);
  if (product) {
    await product.deleteOne();
    res.status(204).json({ success: true, data: {} });
  } else {
    res.status(404).json({ success: false, message: 'Product not found' });
  }
};
