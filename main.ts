import { Config } from "./config.ts";
import { ensureEnv } from "./util.ts";
import schema from "./schema.ts";

const configPath = ensureEnv("GIT_ID_CONFIG");

const main = async () => {
  const config = await loadConfig(configPath);
  console.log(JSON.stringify(config, null, 2));
};

const loadConfig = async (path: string): Promise<Config> => {
  const { default: config } = await import(path);
  const valid = schema(config);
  if (schema.errors) {
    for (const { instancePath, message } of schema.errors) {
      console.error(`error: ${instancePath}: ${message}`);
    }
  }
  if (!valid) {
    Deno.exit(1);
  }
  return config;
};

await main();
