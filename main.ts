const path = Deno.args[0]

const { config } = await import(path);

console.log(JSON.stringify(config, null, 2));
