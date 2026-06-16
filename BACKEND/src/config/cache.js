const Redis = require("ioredis").default;

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});
redis.on("connect", () => {
  console.log("redis server is connected");
});
redis.on("error", (error) => {
  console.error("error connecting to redis", error);
});
module.exports = redis;
