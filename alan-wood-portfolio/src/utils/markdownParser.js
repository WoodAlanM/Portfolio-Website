// src/utils/customMarkdownPlugin.js
import { visit } from 'unist-util-visit';

const customImageSyntax = () => {
  return (tree) => {
    visit(tree, 'text', (node) => {
      const customSyntaxRegex = /!!image-path!!="([^"]+)"/g;
      if (customSyntaxRegex.test(node.value)) {
        node.type = 'html';
        node.value = node.value.replace(customSyntaxRegex, '<img src="$1" alt="Image" />');
      }
    });
  };
};

export default customImageSyntax;
