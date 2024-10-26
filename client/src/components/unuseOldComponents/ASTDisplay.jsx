import React from 'react';

// Function to recursively render the AST
const RenderASTNode = ({ node, level = 0 }) => {
  // console.log(node);
  if (!node) return null;

  const indentStyle = {
    marginLeft: `${level * 20}px`, // indent child nodes
    padding: '5px',
  };

  if (node.type === 'operator') {
    return (
      <div style={indentStyle}>
        <strong>Operator:</strong> {node.value}
        <div>
          <RenderASTNode node={node.left} level={level + 1} />
          <RenderASTNode node={node.right} level={level + 1} />
        </div>
      </div>
    );
  }

  if (node.type === 'operand') {
    return (
      <div style={indentStyle}>
        <strong>Operand:</strong> {node.value}
      </div>
    );
  }

  return null;
};

// Main component to render the AST
const ASTDisplay = ({ ast }) => {
  return (
    <div>
      <h2>Abstract Syntax Tree (AST)</h2>
      <RenderASTNode node={ast} />
    </div>
  );
};

export default ASTDisplay