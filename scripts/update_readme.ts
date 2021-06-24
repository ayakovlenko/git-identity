import * as git from "https://raw.githubusercontent.com/ayakovlenko/deno-git/v0.3.0/mod.ts";

const { stdout } = await git.run([
  "describe",
  "--abbrev=0",
  "--tags",
]);

const latestTag = stdout.trim();

const readme = Deno.readTextFileSync("README.md");

const updatedReadme = readme.replaceAll(
  /git-identity\/.*\//g,
  `git-identity/${latestTag}/`,
);

Deno.writeTextFileSync("README.md", updatedReadme);
