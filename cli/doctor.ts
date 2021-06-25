import { Command, git } from "../deps.ts";

export default new Command()
  .description("doctor")
  .action(async () => {
    const checks: string[] = await Promise.all([
      check(
        "git config --global user.useConfigOnly true",
        async () => {
          const { stdout } = await git.run([
            "config",
            "--global",
            "user.useConfigOnly",
          ]);
          return stdout.trim() === "true";
        },
      ),
      check(
        "git config --global --unset-all user.name",
        async () => {
          const { stdout } = await git.run([
            "config",
            "--global",
            "user.name",
          ]);
          return stdout.trim() === "";
        },
      ),
      check(
        "git config --global --unset-all user.email",
        async () => {
          const { stdout } = await git.run([
            "config",
            "--global",
            "user.email",
          ]);
          return stdout.trim() === "";
        },
      ),
      check(
        "git config --system --unset-all user.name",
        async () => {
          const { stdout } = await git.run([
            "config",
            "--system",
            "user.name",
          ]);
          return stdout.trim() === "";
        },
      ),
      check(
        "git config --system --unset-all user.email",
        async () => {
          const { stdout } = await git.run([
            "config",
            "--system",
            "user.email",
          ]);
          return stdout.trim() === "";
        },
      ),
    ]);

    console.log(checks.join("\n"));
  });

const check = async (
  name: string,
  check: () => Promise<boolean>,
): Promise<string> => {
  const tick = await check() ? "x" : " ";
  return `- [${tick}] ${name}`;
};
