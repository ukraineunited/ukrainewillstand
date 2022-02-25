export default async function aggregate(env: Environment) : Promise<void> {
  let data = [], next = await env.KV.list();
  while(true) {
    for(const key of next.keys) {
      const res = await env.KV.get(key.name);
      if(!res) continue;
      data.push(JSON.parse(res));
      await env.KV.delete(key.name);
    };
    if(next.list_complete) break;
    next = await env.KV.list({cursor:next.cursor});
  }
  await fetch("https://someAPI.com", {method:"POST", body:JSON.stringify(data), headers:{"Content-Type":"application/json"}});
  return;
}