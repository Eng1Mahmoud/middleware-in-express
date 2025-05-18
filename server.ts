import express from "express";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
const server = express();
const PORT = process.env.PORT || 3000;

//  Middlware logging 
server.use(morgan("dev"));
// Rate limiting middleware
const limiter = rateLimit({ 
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers

});
server.use(limiter);

server.get("/", (req, res) => {
  res.send("Hello, World!");
});

try {
  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
} catch (err) {
  console.error("Server failed to start:", err);
}
