const latestTag = Deno.args[0];
if (!latestTag) {
  console.error("tag missing");
  Deno.exit(1);
}

const readme = Deno.readTextFileSync("README.md");

const updatedReadme = readme.replaceAll(
  /git-identity\/.*?\//g,
  `git-identity/${latestTag}/`,
);

Deno.writeTextFileSync("README.md", updatedReadme);
