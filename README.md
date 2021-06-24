# git-identity

[![vr scripts](https://badges.velociraptor.run/flat.svg)](https://velociraptor.run)

Example of a minimal config:

```typescript
import {
  Config,
} from "https://raw.githubusercontent.com/ayakovlenko/git-identity/v0.2.0/config.ts";

export const config = new Config({});
```

Since the configuration file is just TypeScript, `Config` class will guide you
towards writing a valid config. Full config definition can be found by following
the import URL.

This style of configuration is almost identical with
[`zit`](https://github.com/ayakovlenko/zit) config files:

```typescript
import {
  Config,
  User,
} from "https://raw.githubusercontent.com/ayakovlenko/git-identity/v0.2.0/config.ts";

const personal = new User("JD42", "JD42@users.noreply.github.com");
const work = new User("John Doe", "john.doe@corp.com");

export const config = new Config({
  "github.com": {
    default: personal,
    overrides: [
      {
        owner: "corp",
        user: work,
      },
    ],
  },
});
```

Another option is to export an empty `config` instance. Such config files end up
being more flat:

```typescript
import {
  config,
  User,
} from "https://raw.githubusercontent.com/ayakovlenko/git-identity/v0.2.0/config.ts";

const personal = {
  github: new User("JD42", "JD42@users.noreply.github.com"),
  gitlab: new User("JD42", "786972-JD42@users.noreply.gitlab.com"),
};
const work = new User("John Doe", "john.doe@corp.com");

config["github.com"] = {
  default: personal.github,
  overrides: [
    {
      owner: "corp",
      user: work,
    },
  ],
};

config["gitlab"] = {
  default: personal.gitlab,
};

export { config };
```
