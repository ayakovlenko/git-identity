import { load } from "../config.ts";
import { Command } from "../deps.ts";
import { ensureEnv } from "../util.ts";

export default new Command()
  .description("show")
  .action(async () => {
    const configPath = ensureEnv("GIT_ID_CONFIG");
    const config = await load(configPath);
    console.log(JSON.stringify(config, null, 2));
  });
