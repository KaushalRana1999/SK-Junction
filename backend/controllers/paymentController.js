const Razorpay = require('razorpay');
const crypto = require('crypto');

const createOrder = async (req, res) => {
  try {
    // If keys are missing, bypass Razorpay
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return res.json({
        bypass: true,
        message: "Razorpay not configured. Student Bypass Mode active.",
        orderId: "TEST_" + Date.now(),
        amount: req.body.amount,
        currency: "INR"
      });
    }

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: req.body.amount * 100, // paise
      currency: "INR",
    };

    const order = await instance.orders.create(options);
    if (!order) return res.status(500).send("Some error occurred");
    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

const verifyPayment = async (req, res) => {
  try {
    // If bypass mode, auto-verify
    if (!process.env.RAZORPAY_KEY_SECRET) {
      return res.status(200).json({ message: "Payment bypassed and verified." });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      return res.status(200).json({ message: "Payment verified successfully" });
    } else {
      return res.status(400).json({ message: "Invalid signature sent!" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { createOrder, verifyPayment };
