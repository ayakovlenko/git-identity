import { Either, either } from "./deps.ts";
import { Config, Host, User } from "./lib/config.ts";
import { RepoInfo } from "./mod.ts";

const find = (
  config: Config,
  repoInfo: RepoInfo,
): Either<string, User> => {
  const host = getHost(config, repoInfo.host);

  return host.bind<User>(findMatchInHost(repoInfo));
};

const getHost = (config: Config, host: string): Either<string, Host> => {
  const hostConfig = config[host];
  return !hostConfig
    ? either.left(`no config defined for ${host}`)
    : either.right(hostConfig);
};

const findMatchInHost = (
  { owner: repoOwner, name: repoName }: RepoInfo,
): (host: Host) => Either<string, User> => {
  return (host: Host): Either<string, User> => {
    let best = host.default;

    if (host.overrides) {
      for (const { owner, repo, user } of host.overrides) {
        if (owner === repoOwner && repoName === repo) {
          best = user;
        } else if (owner === repoOwner) {
          best = user;
          break; // the exact match
        }
      }
    }

    return !best ? either.left("no match found") : either.right(best);
  };
};

export { find };
