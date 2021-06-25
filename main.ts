import { Config } from "./config.ts";
import { ensureEnv } from "./util.ts";
import schema from "./schema.ts";
import { parseYaml } from "./deps.ts";

const configPath = ensureEnv("GIT_ID_CONFIG");

const main = async () => {
  const config = await loadConfig(configPath);
  console.log(JSON.stringify(config, null, 2));
};

const loadConfig = async (path: string): Promise<Config> => {
  let config: Config;

  if (path.endsWith(".json")) {
    config = JSON.parse(Deno.readTextFileSync(path)) as Config;
  } else if (path.endsWith(".yaml") || path.endsWith(".yml")) {
    const { hosts } = parseYaml(Deno.readTextFileSync(path)) as {
      hosts?: Config;
    };
    if (!hosts) {
      console.error("error: YAML config must reside under `hosts` property");
      Deno.exit(1);
    }
    config = hosts;
  } else {
    const { default: _config } = await import(path);
    config = _config;
  }

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
