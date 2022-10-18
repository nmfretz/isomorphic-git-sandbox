const fs = require("fs");
const git = require("isomorphic-git");
const http = require("isomorphic-git/http/node");

const url = "https://github.com/agora-org/agora";
// const url = "https://github.com/bitfeed-project/bitfeed";
// const url = "https://gitlab.torproject.org/tpo/anti-censorship/pluggable-transports/snowflake/-/tree/main";
// const url = "https://gitlab.torproject.org/tpo/anti-censorship/pluggable-transports/snowflake/";
// const url = "https://github.com/louneskmt/umbrel-samourai-dojo/";
// const url = "https://github.com/janeczku/calibre-web";
// const url = "https://github.com/Ride-The-Lightning/RTL";

(async () => {
  let info = await git.getRemoteInfo({
    http,
    url,
  });
  console.log(info.refs.tags);

  // Working on parsing the most relevant tag
  const tag = parseLatestTag(Object.keys(info.refs.tags));
  console.log(tag);

  // Next step is to get publish date and url for the tag
})();

function parseLatestTag(tags) {
  const latestTag = tags
    .filter((tag) => /\d/.test(tag))
    .filter((tag) => /\./g.test(tag))
    .filter((tag) => !tag.includes("^{}"))
    .reduce((a, b) => (0 < a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }) ? a : b));

  return latestTag;
}
