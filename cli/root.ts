import { Command } from "../deps.ts";
import ShowCommand from "./show.ts";
import CloneCommand from "./clone.ts";
import DoctorCommand from "./doctor.ts";

const cli = async () => {
  await new Command()
    .description("git-identity")
    .command("show", ShowCommand)
    .reset()
    .command("clone", CloneCommand)
    .reset()
    .command("doctor", DoctorCommand)
    .reset()
    .parse(Deno.args);
};

export { cli };
