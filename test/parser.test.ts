import { assertEquals, assert, assertThrows } from "./deps.ts";
import { parser } from "../mod.ts";
import releaseCreator from "./fixture/CustomRelease.ts";
import getSettingsForURL from "../src/settings.ts";

const file = new URL("./changelog.custom.type.md", import.meta.url).pathname;
const fileGitlab = new URL("./changelog.gitlab.md", import.meta.url).pathname;
const fileAzdo = new URL("./changelog.azdo.md", import.meta.url).pathname;
const changelogContent = Deno.readTextFileSync(file);
const changelogContentGitlab = Deno.readTextFileSync(fileGitlab);
const changelogContentAzdo = Deno.readTextFileSync(fileAzdo);

Deno.test("parser testing", function () {
  // is unable to parse changelog with unknown types
  assertThrows(() => parser(changelogContent));

  // parses a changelog with custom types using a custom releaseCreator
  const changelog = parser(changelogContent, { releaseCreator });

  assertEquals(changelog.toString().trim(), changelogContent.trim());
});

Deno.test("parser testing gitlab", function () {
  // parses a changelog with gitlab links
  const changelog = parser(changelogContentGitlab, );

  // get settings from url
  assert(changelog.url)

  if(changelog.url) {
    const settings = getSettingsForURL(changelog.url);
    assert(settings)

    if (settings) {
      changelog.head = settings.head;
      changelog.tagLinkBuilder = settings.tagLink;
    }
  }

  assertEquals(changelog.toString().trim(), changelogContentGitlab.trim());
});

Deno.test("parser testing Azure DevOps", function () {
  // parses a changelog with Azure DevOps links
  const changelog = parser(changelogContentAzdo, );

  // get settings from url
  assert(changelog.url, "URL is not defined");

  if(changelog.url) {
    const settings = getSettingsForURL(changelog.url);
    assert(settings)

    if (settings) {
      changelog.head = settings.head;
      changelog.tagLinkBuilder = settings.tagLink;
    }
  }

  assertEquals(changelog.toString().trim(), changelogContentAzdo.trim());
});
