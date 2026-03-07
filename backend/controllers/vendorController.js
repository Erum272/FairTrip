const Vendor = require("../models/Vendor");

/* Get trusted vendors */
exports.getVendors = async (req, res) => {
try {

```
const vendors = await Vendor.find();

res.status(200).json({
  success: true,
  data: vendors
});
```

} catch (error) {

```
res.status(500).json({
  success: false,
  message: "Error fetching vendors",
  error: error.message
});
```

}
};

/* Add a new vendor */
exports.addVendor = async (req, res) => {
try {

```
const { shopName, location, rating, verified } = req.body;

const newVendor = new Vendor({
  shopName,
  location,
  rating,
  verified
});

const savedVendor = await newVendor.save();

res.status(201).json({
  success: true,
  message: "Vendor added successfully",
  data: savedVendor
});
```

} catch (error) {

```
res.status(500).json({
  success: false,
  message: "Error adding vendor",
  error: error.message
});
```

}
};
