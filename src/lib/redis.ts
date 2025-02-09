import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.NEXT_PUBLIC_UPSTASH_URL!,
  token: process.env.UPSTASH_TOKEN!,
});

export default redis;
