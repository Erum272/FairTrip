const ScamReport = require("../models/ScamReport");

/* Get all scam reports */
exports.getScams = async (req, res) => {
try {

```
const scams = await ScamReport.find().sort({ date: -1 });

res.status(200).json({
  success: true,
  data: scams
});
```

} catch (error) {

```
res.status(500).json({
  success: false,
  message: "Error fetching scam reports",
  error: error.message
});
```

}
};

/* Report a scam */
exports.reportScam = async (req, res) => {
try {

```
const { location, description, reportedBy } = req.body;

const newScam = new ScamReport({
  location,
  description,
  reportedBy
});

const savedScam = await newScam.save();

res.status(201).json({
  success: true,
  message: "Scam reported successfully",
  data: savedScam
});
```

} catch (error) {

```
res.status(500).json({
  success: false,
  message: "Error reporting scam",
  error: error.message
});
```

}
};
