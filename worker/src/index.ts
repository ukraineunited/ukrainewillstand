import DataExtractor from "./DataExtractor";
import aggregate from "./Aggregator";
import { nanoid } from "nanoid";

export default {
  async fetch(req: Request, env: Environment) {
    if(req.method !== "POST") return new Response("Method not allowed", {status: 405});
    if(req.headers.get("content-type") !== "application/x-www-form-urlencoded") return new Response("Content-Type not allowed", {status: 415});
    const data = await req.formData(),
      extracted = DataExtractor(data);
    if(typeof extracted === "string") return new Response(`Invalid Data: ${extracted}`, { status: 400 });
    await env.KV.put(nanoid(), JSON.stringify(extracted));
    return new Response("OK");
  },
  async scheduled(event: ScheduledEvent, env: Environment, ctx: ExecutionContext) {
    ctx.waitUntil(aggregate(env));
  }
};