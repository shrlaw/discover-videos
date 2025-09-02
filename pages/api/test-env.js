export default function handler(req, res) {
  try {
    res.status(200).json({
      MAGIC_SERVER_KEY: process.env.MAGIC_SERVER_KEY || "not set",
      JWT_SECRET: process.env.JWT_SECRET || "not set",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
