const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path  = require('path');
require("dotenv").config();

// set up express

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('static'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));

// set up mongoose
mongoose.connect(
  // "mongodb+srv://doadmin:rcw7X3096nOW84l5@db-mongodb-nyc3-84598-86b4aaaa.mongo.ondigitalocean.com/admin",
  "mongodb://localhost:27017/aotactical",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB connection established");
  }
);

// set up routes
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'static/index.html'))
})

app.use("/users", require("./routes/userRouter"));
app.use("/products", require("./routes/productRouter"));
app.use("/payments", require("./routes/paymentRouter"));
app.use("/accounts", require("./routes/accountRouter"));
app.use("/customers", require("./routes/customerRouter"));
app.use("/vendors", require("./routes/vendorRouter"));
app.use("/lipseys", require("./routes/lipseyRouter"));
app.use("/admin", require("./routes/adminRouter"));
app.use("/track", require("./routes/visitLogRouter"));