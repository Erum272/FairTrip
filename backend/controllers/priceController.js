const Price = require("../models/Price");

/* Get all product prices */
exports.getPrices = async (req, res) => {
try {

```
const prices = await Price.find();

res.status(200).json({
  success: true,
  data: prices
});
```

} catch (error) {

```
res.status(500).json({
  success: false,
  message: "Error fetching prices",
  error: error.message
});
```

}
};

/* Add new product price */
exports.addPrice = async (req, res) => {
try {

```
const { productName, averagePrice, currency, location } = req.body;

const newPrice = new Price({
  productName,
  averagePrice,
  currency,
  location
});

const savedPrice = await newPrice.save();

res.status(201).json({
  success: true,
  message: "Price added successfully",
  data: savedPrice
});
```

} catch (error) {

```
res.status(500).json({
  success: false,
  message: "Error adding price",
  error: error.message
});
```

}
};
