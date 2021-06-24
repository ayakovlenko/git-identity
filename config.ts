export class Config {
  [hostName: string]: Host

  constructor(init: Record<string, Host>) {
    for (const [hostName, host] of Object.entries(init)) {
      this[hostName] = host;
    }
  }
}

export const config = new Config({});

export class User {
  constructor(public readonly name: string, public readonly email: string) {}
}

export interface Host {
  default?: User;
  overrides?: Override[];
}

export interface Override {
  owner: string;
  repo?: string;
  user: User;
}
