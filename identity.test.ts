import { either } from "./deps.ts";
import { assertEquals } from "./deps_test.ts";
import { find } from "./identity.ts";
import { Config } from "./lib/config.ts";
import { RepoInfo } from "./mod.ts";

Deno.test("no config defined for host", () => {
  const config = new Config({});
  const repoInfo: RepoInfo = {
    host: "github.com",
    owner: "denoland",
    name: "deno",
  };

  const want = either.left("no config defined for github.com");

  const have = find(config, repoInfo);

  assertEquals(have, want);
});

Deno.test("choose default config", () => {
  const user = {
    name: "Jane Doe",
    email: "jane.doe@gmail.com",
  };

  const config = new Config({
    "github.com": {
      default: user,
    },
  });

  const repoInfo: RepoInfo = {
    host: "github.com",
    owner: "denoland",
    name: "deno",
  };

  const want = either.right(user);

  const have = find(config, repoInfo);

  assertEquals(have, want);
});
