const rateLimit = require("express-rate-limit");

// limiter requests
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes block
  max: 3, // limit 3 requests for IP else 5 minustes block
});

module.exports = { limiter };
//export to routes user
