const latestTag = Deno.args[0];
if (!latestTag) {
  console.error("tag missing");
}

const readme = Deno.readTextFileSync("README.md");

const updatedReadme = readme.replaceAll(
  /git-identity\/.*\//g,
  `git-identity/${latestTag}/`,
);

Deno.writeTextFileSync("README.md", updatedReadme);
