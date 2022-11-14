const rateLimit = require("express-rate-limit");

// limiter requests
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes block
  max: 5, //  Limit each IP to 5 requests per window (here, per 5 minutes)
});

module.exports = { limiter };
//export to routes user
