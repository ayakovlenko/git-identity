import { Ajv, ajv } from "./deps.ts";

const instance = new Ajv();

const userSchema: ajv.Schema = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    email: {
      type: "string",
    },
  },
  required: [
    "name",
    "email",
  ],
};

const overrideSchema: ajv.Schema = {
  type: "object",
  properties: {
    owner: {
      type: "string",
    },
    repo: {
      type: "string",
    },
    user: userSchema,
  },
  required: [
    "owner",
    "user",
  ],
};

const configSchema: ajv.Schema = {
  type: "object",
  additionalProperties: {
    type: "object",
    properties: {
      default: userSchema,
      overrides: {
        type: "array",
        items: overrideSchema,
      },
    },
  },
};

export default instance.compile(configSchema);
