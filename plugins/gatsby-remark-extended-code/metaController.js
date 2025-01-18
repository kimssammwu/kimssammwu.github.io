function parseMetaString(metaSource) {
  const result = {};
  const regex = /@(\w+)='([^']*)'/g;
  let match;
  while ((match = regex.exec(metaSource)) !== null) {
    result[match[1]] = match[2];
  }
  return result;
}

function getDevIcon(iconName) {
  return `<img class="dev-icon" src="https://cdn.simpleicons.org/${iconName}/FFFFFF"/>`;
}

function getCodeblockHeaderFromMeta(metaSource, language) {
  const metaTagMap = parseMetaString(metaSource);
  let content = language;

  if (metaTagMap.title) {
    content = metaTagMap.icon
      ? getDevIcon(metaTagMap.icon) + "<span>" + metaTagMap.title + "</span>"
      : metaTagMap.title;
  }

  return `<pre class='shiki-header'>${content}</pre>`;
}

module.exports = { getCodeblockHeaderFromMeta };
