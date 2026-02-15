const crypto = require("crypto");

module.exports = () => {
  return "sentinel_" + crypto.randomBytes(24).toString("hex");
};
