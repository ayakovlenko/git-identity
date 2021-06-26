import { Either, either } from "./deps.ts";
import { Config, User } from "./lib/config.ts";
import { RepoInfo } from "./mod.ts";

const find = (
  config: Config,
  repoInfo: RepoInfo,
): Either<string, User> => {
  const { host } = repoInfo;

  const hostConfig = config[host];

  if (!hostConfig) {
    return either.left(`no config defined for ${host}`);
  }

  return either.right(new User("John Doe", "john.doe@gmail.com"));
};

export { find };
