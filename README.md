# git-identity

[![vr scripts](https://badges.velociraptor.run/flat.svg)](https://velociraptor.run)

Example of a minimal config:

```typescript
import {
  Config,
} from "https://raw.githubusercontent.com/ayakovlenko/git-identity/v0.2.0/config.ts";

export default new Config({});
```

Or:

```typescript
import {
  config,
} from "https://raw.githubusercontent.com/ayakovlenko/git-identity/v0.2.0/config.ts";

export default config;
```

Since the configuration file is just TypeScript, `Config` class will guide you
towards writing a valid config. Full config definition can be found by following
the import URL.

This style of configuration is almost identical with
[`zit`](https://github.com/ayakovlenko/zit) config files:

```typescript
// config.ts
import {
  Config,
  User,
} from "https://raw.githubusercontent.com/ayakovlenko/git-identity/v0.2.0/config.ts";

const personal = new User("JD42", "JD42@users.noreply.github.com");
const work = new User("John Doe", "john.doe@corp.com");

export default new Config({
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
// config.ts
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

config["gitlab.com"] = {
  default: personal.gitlab,
};

export default config;
```

If you want the config to be super minimal, JS also works:

```javascript
export default {
  "github.com": {
    "default": {
      "name": "JD42",
      "email": "JD42@users.noreply.github.com",
    },
    "overrides": [
      {
        "owner": "corp",
        "user": {
          "name": "John Doe",
          "email": "john.doe@corp.com",
        },
      },
    ],
  },
  "gitlab.com": {
    "default": {
      "name": "JD42",
      "email": "786972-JD42@users.noreply.gitlab.com",
    },
  },
};
```

JSON also works:

```jsonc
// config.json
{
  "github.com": {
    "default": {
      "name": "JD42",
      "email": "JD42@users.noreply.github.com"
    },
    "overrides": [
      {
        "owner": "corp",
        "user": {
          "name": "John Doe",
          "email": "john.doe@corp.com"
        }
      }
    ]
  },
  "gitlab.com": {
    "default": {
      "name": "JD42",
      "email": "786972-JD42@users.noreply.gitlab.com"
    }
  }
}
```

And YAML, too (no judgement):

```yaml
# config.yaml (or config.yml)
users:
  work: &work_user
    name: John Doe
    email: john.doe@corp.com
  personal:
    github_user: &personal_github_user
      name: JD42
      email: JD42@users.noreply.github.com
    gitlab_user: &personal_gitlab_user
      name: JD42
      email: 786972-JD42@users.noreply.gitlab.com

hosts:
  github.com:
    default: *personal_github_user
    overrides:
      - owner: corp
        user: *work_user

  gitlab.com:
    default: *personal_gitlab_user
```
