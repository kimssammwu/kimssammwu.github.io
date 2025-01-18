const visit = require("unist-util-visit");
const metaController = require("./metaController");

const { getCodeblockHeaderFromMeta } = metaController;

module.exports = async ({ markdownAST }) => {
  const [shiki, shikiTransformers] = await Promise.all([
    import("shiki"),
    import("@shikijs/transformers"),
  ]);

  const { codeToHtml } = shiki;
  const { transformerNotationDiff, transformerNotationHighlight } =
    shikiTransformers;

  const transformers = [
    transformerNotationDiff(), // Handles diff (- +)
    transformerNotationHighlight(), // Handles custom highlights
  ];

  const theme = "one-dark-pro";

  const promises = [];

  visit(markdownAST, "code", (node) => {
    const language = node.lang ?? "plaintext";

    promises.push(
      codeToHtml(node.value, { lang: language, theme, transformers })
        .then((highlightedCode) => {
          node.type = "html";
          node.value =
            getCodeblockHeaderFromMeta(node.meta, language) + highlightedCode;
          delete node.children;
        })
        .catch((error) => {
          console.error(
            `Error highlighting code for language "${language}":`,
            error
          );
        })
    );
  });
  await Promise.all(promises);
  return markdownAST;
};
