export default function handler(req, res) {
  res.json({
    MAGIC_SERVER_KEY: process.env.MAGIC_SERVER_KEY ? "SET" : "NOT SET",
    JWT_SECRET: process.env.JWT_SECRET ? "SET" : "NOT SET",
  });
}
