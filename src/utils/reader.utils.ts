export function expectedReadTime(content: string) {
  const WordPerMinute = 200;
  const removedTagContent = content.replace(/<[^>]*>?/g, "");
  const allWords = removedTagContent
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
  return Math.ceil(allWords / WordPerMinute);
}
