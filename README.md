# git-identity

[![vr scripts](https://badges.velociraptor.run/flat.svg)](https://velociraptor.run)

Example of a minimal config:

```typescript
import {
  Config
} from "https://raw.githubusercontent.com/ayakovlenko/git-identity/v0.1.0/config.ts";

export const config = new Config({});
```

Since the configuration file is just TypeScript, `Config` class will guide you towards writing a valid config. Full config definition can be found by following the import URL.
