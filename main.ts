import { Config } from "./config.ts";
import { ensureEnv } from "./util.ts";

const configPath = ensureEnv("GIT_ID_CONFIG");

const main = async () => {
  const config = await loadConfig(configPath);
  console.log(JSON.stringify(config, null, 2));
};

const loadConfig = async (path: string): Promise<Config> => {
  return await import(path);
};

await main();
