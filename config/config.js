const config = {
  app: {
    port: 8800,
    OTPExpiry: 2 //minute
  },
  db: {
    host: "localhost",
    port: 27017,
    name: "sharekard"
  }
};
module.exports = config;
