const express = require("express");
const Razorpay = require("razorpay");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = require("./config");

const razorpay = new Razorpay({
  key_id: rzp_test_lvIjDBjauyGj9a,
  key_secret: KXbRcMTuKjysnuPnJ91fXLfH,
});

// ✅ Serve all files from public folder
app.use(express.static(path.join(__dirname, "../public")));

app.use(bodyParser.json());

app.post("/create-order", async (req, res) => {
  const amount = req.body.amount * 100;
  const options = {
    amount,
    currency: "INR",
    receipt: "receipt#1",
  };
  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).send("Error creating order");
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at: http://localhost:${PORT}`);
});
