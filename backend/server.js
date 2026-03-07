const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const priceRoutes = require("./routes/priceRoutes");
const vendorRoutes = require("./routes/vendorRoutes");
const scamRoutes = require("./routes/scamRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/prices", priceRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/scams", scamRoutes);

app.get("/", (req, res) => {
res.send("FairTrip API Running");
});

const PORT = 5000;

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
