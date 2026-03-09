const express = require("express");
const cors = require("cors");

const priceRoutes = require("./routes/priceRoutes");
const taxiRoutes = require("./routes/taxiRoutes");
const vendorRoutes = require("./routes/vendorRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/prices", priceRoutes);
app.use("/api/taxi", taxiRoutes);
app.use("/api/vendors", vendorRoutes);

const PORT = 5000;

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});