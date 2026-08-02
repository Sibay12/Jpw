import Razorpay from "razorpay";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method Not Allowed",
    });
  }

  try {
    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    // 1. Environment Variable Guard
    if (!key_id || !key_secret) {
      console.error("Razorpay Keys are missing in Environment Variables!");
      return res.status(500).json({
        success: false,
        message: "Razorpay environment variables are not configured.",
      });
    }

    // 2. Initialize Razorpay Client
    const razorpay = new Razorpay({ key_id, key_secret });

    // 3. Amount parsing & safety check
    const { amount } = req.body || {};
    const parsedAmount = Number(amount) || 2000; // Default ₹20 in paise

    // 4. Create Order
    const order = await razorpay.orders.create({
      amount: parsedAmount,
      currency: "INR",
      receipt: `JPW_${Date.now()}`,
      notes: {
        service: "JPW Reach",
        company: "JPW REACHED SERVICES BOT",
      },
    });

    return res.status(200).json(order);
  } catch (err) {
    // Exact Razorpay API Error Details for Vercel Runtime Logs
    console.error("Razorpay Order Creation Error:", err);

    return res.status(500).json({
      success: false,
      message: err?.error?.description || err.message || "Order Creation Failed",
    });
  }
}
