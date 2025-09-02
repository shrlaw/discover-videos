export default function handler(req, res) {
  res.status(200).json({
    MAGIC_SERVER_KEY: process.env.MAGIC_SERVER_KEY ? "✅ Set" : "❌ Missing",
    JWT_SECRET: process.env.JWT_SECRET ? "✅ Set" : "❌ Missing",
  });
}
