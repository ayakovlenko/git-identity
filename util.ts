const ensureEnv = (name: string): string => {
  const value = Deno.env.get(name);
  if (!value) {
    console.error(`${name} variable is not set`);
    Deno.exit(1);
  }
  return value;
};

export { ensureEnv };
